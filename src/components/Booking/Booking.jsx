import React, { useState, useEffect } from 'react'
import styles from './Booking.module.css'
import { supabase } from '../../lib/supabase'
import { FiCalendar, FiClock, FiUser, FiPhone, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const STEPS = ['Servicio', 'Barbero', 'Fecha & Hora', 'Datos', 'Confirmación']

const HOURS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30',
  '13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30',
  '17:00','17:30','18:00','18:30','19:00','19:30']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAYS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

export default function Booking() {
  const [step, setStep] = useState(0)
  const [services, setServices] = useState([])
  const [barbers, setBarbers] = useState([])
  const [takenSlots, setTakenSlots] = useState([])
  const [form, setForm] = useState({
    service: null, barber: null, date: null, time: null,
    name: '', phone: '', email: '', notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const today = new Date()
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calYear, setCalYear] = useState(today.getFullYear())

  useEffect(() => {
    supabase.from('services').select('*').then(({ data }) => data && setServices(data))
    supabase.from('barbers').select('*').eq('active', true).then(({ data }) => data && setBarbers(data))
  }, [])

  useEffect(() => {
    if (form.barber && form.date) {
      supabase.from('appointments')
        .select('appointment_time')
        .eq('barber_id', form.barber.id)
        .eq('appointment_date', form.date)
        .neq('status', 'cancelled')
        .then(({ data }) => {
          if (data) setTakenSlots(data.map(a => a.appointment_time.slice(0,5)))
        })
    }
  }, [form.barber, form.date])

  const select = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('appointments').insert({
        client_name: form.name,
        client_phone: form.phone,
        client_email: form.email || null,
        barber_id: form.barber.id,
        service_id: form.service.id,
        appointment_date: form.date,
        appointment_time: form.time,
        notes: form.notes || null,
        status: 'pending'
      })
      if (err) throw err
      setSuccess(true)
      setStep(4)
    } catch (e) {
      setError('Error al reservar. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setForm({ service: null, barber: null, date: null, time: null, name: '', phone: '', email: '', notes: '' })
    setStep(0)
    setSuccess(false)
    setError('')
  }

  const formatDate = (d) => {
    if (!d) return ''
    const [y, m, day] = d.split('-')
    return `${day} de ${MONTHS[parseInt(m)-1]} ${y}`
  }

  const daysInMonth = getDaysInMonth(calYear, calMonth)
  const firstDay = getFirstDayOfMonth(calYear, calMonth)
  const calDays = Array.from({ length: firstDay }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const isPast = (day) => {
    const d = new Date(calYear, calMonth, day)
    const t = new Date(); t.setHours(0,0,0,0)
    return d < t
  }

  const isSelected = (day) => {
    if (!day) return false
    const str = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    return form.date === str
  }

  const selectDay = (day) => {
    if (!day || isPast(day)) return
    const str = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    select('date', str)
    select('time', null)
  }

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }

  const canNext = () => {
    if (step === 0) return !!form.service
    if (step === 1) return !!form.barber
    if (step === 2) return !!form.date && !!form.time
    if (step === 3) return form.name.trim() && form.phone.trim()
    return true
  }

  return (
    <section id="booking" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.line}></div>
            <span>RESERVAS ONLINE</span>
            <div className={styles.line}></div>
          </div>
          <h2 className={styles.title}>Reservá tu<br /><em>turno</em></h2>
          <p className={styles.subtitle}>Elegí el servicio, el barbero y el horario que más te convenga.</p>
        </div>

        {!success && (
          <div className={styles.stepBar}>
            {STEPS.map((s, i) => (
              <div key={i} className={`${styles.stepItem} ${i === step ? styles.active : ''} ${i < step ? styles.done : ''}`}>
                <div className={styles.stepDot}>
                  {i < step ? <FiCheck size={12} /> : <span>{i + 1}</span>}
                </div>
                <span className={styles.stepLabel}>{s}</span>
              </div>
            ))}
          </div>
        )}

        <div className={styles.panel}>
          {/* STEP 0 — Servicio */}
          {step === 0 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>¿Qué servicio querés?</h3>
              <div className={styles.serviceGrid}>
                {services.map(s => (
                  <div
                    key={s.id}
                    className={`${styles.serviceCard} ${form.service?.id === s.id ? styles.selected : ''}`}
                    onClick={() => select('service', s)}
                  >
                    <div className={styles.serviceName}>{s.name}</div>
                    <div className={styles.serviceMeta}>
                      <span><FiClock size={12} /> {s.duration_minutes} min</span>
                      <span className={styles.servicePrice}>${Number(s.price).toLocaleString()}</span>
                    </div>
                    {s.description && <p className={styles.serviceDesc}>{s.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Barbero */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>¿Con quién querés atenderte?</h3>
              <div className={styles.barberGrid}>
                {barbers.map(b => (
                  <div
                    key={b.id}
                    className={`${styles.barberCard} ${form.barber?.id === b.id ? styles.selected : ''}`}
                    onClick={() => select('barber', b)}
                  >
                    <div className={styles.barberAvatar}>
                      {b.name.charAt(0)}
                    </div>
                    <div className={styles.barberName}>{b.name}</div>
                    {b.bio && <p className={styles.barberBio}>{b.bio.slice(0, 80)}...</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Fecha & Hora */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Elegí fecha y horario</h3>
              <div className={styles.dateTimeGrid}>
                <div className={styles.calendar}>
                  <div className={styles.calHeader}>
                    <button onClick={prevMonth}><FiChevronLeft /></button>
                    <span>{MONTHS[calMonth]} {calYear}</span>
                    <button onClick={nextMonth}><FiChevronRight /></button>
                  </div>
                  <div className={styles.calDayNames}>
                    {DAYS.map(d => <span key={d}>{d}</span>)}
                  </div>
                  <div className={styles.calGrid}>
                    {calDays.map((day, i) => (
                      <div
                        key={i}
                        className={`${styles.calDay}
                          ${!day ? styles.empty : ''}
                          ${day && isPast(day) ? styles.past : ''}
                          ${isSelected(day) ? styles.calSelected : ''}
                        `}
                        onClick={() => selectDay(day)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>

                {form.date && (
                  <div className={styles.timeSlots}>
                    <p className={styles.selectedDate}><FiCalendar size={14} /> {formatDate(form.date)}</p>
                    <div className={styles.slotsGrid}>
                      {HOURS.map(h => {
                        const taken = takenSlots.includes(h)
                        return (
                          <button
                            key={h}
                            className={`${styles.slot} ${taken ? styles.taken : ''} ${form.time === h ? styles.slotSelected : ''}`}
                            disabled={taken}
                            onClick={() => select('time', h)}
                          >
                            {h}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3 — Datos personales */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Tus datos</h3>
              <div className={styles.summary}>
                <div className={styles.summaryItem}>
                  <span>Servicio:</span><strong>{form.service?.name}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span>Barbero:</span><strong>{form.barber?.name}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span>Fecha:</span><strong>{formatDate(form.date)} a las {form.time}</strong>
                </div>
                <div className={styles.summaryItem}>
                  <span>Precio:</span><strong className={styles.priceHighlight}>${Number(form.service?.price).toLocaleString()}</strong>
                </div>
              </div>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Nombre completo *</label>
                  <div className={styles.inputWrap}>
                    <FiUser />
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={e => select('name', e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Teléfono *</label>
                  <div className={styles.inputWrap}>
                    <FiPhone />
                    <input
                      type="tel"
                      placeholder="Ej: 2627-000000"
                      value={form.phone}
                      onChange={e => select('phone', e.target.value)}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Email (opcional)</label>
                  <div className={styles.inputWrap}>
                    <span>@</span>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={form.email}
                      onChange={e => select('email', e.target.value)}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Notas adicionales</label>
                  <textarea
                    placeholder="¿Algo que debamos saber? (opcional)"
                    value={form.notes}
                    onChange={e => select('notes', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>
          )}

          {/* STEP 4 — Confirmación */}
          {step === 4 && success && (
            <div className={styles.successScreen}>
              <div className={styles.successIcon}><FiCheck size={40} /></div>
              <h3>¡Turno reservado!</h3>
              <p>Tu turno fue registrado con éxito. Te esperamos en Faca Barbería.</p>
              <div className={styles.successDetails}>
                <div><span>Cliente</span><strong>{form.name}</strong></div>
                <div><span>Servicio</span><strong>{form.service?.name}</strong></div>
                <div><span>Barbero</span><strong>{form.barber?.name}</strong></div>
                <div><span>Fecha</span><strong>{formatDate(form.date)} — {form.time} hs</strong></div>
              </div>
              <button className={styles.resetBtn} onClick={reset}>Reservar otro turno</button>
            </div>
          )}

          {/* Navegación */}
          {!success && (
            <div className={styles.nav}>
              {step > 0 && (
                <button className={styles.backBtn} onClick={() => setStep(s => s - 1)}>
                  <FiChevronLeft /> Atrás
                </button>
              )}
              {step < 3 ? (
                <button
                  className={styles.nextBtn}
                  disabled={!canNext()}
                  onClick={() => setStep(s => s + 1)}
                >
                  Continuar <FiChevronRight />
                </button>
              ) : (
                <button
                  className={styles.nextBtn}
                  disabled={!canNext() || loading}
                  onClick={handleSubmit}
                >
                  {loading ? 'Reservando...' : 'Confirmar Turno'} <FiCheck />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}