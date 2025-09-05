<template>
  <div class="calendar-card">
    <div class="calendar-header">
      <div>
        <h3 class="text-lg font-semibold text-gray-700">Calendar</h3>
        <p>Quickly identify deadlines or important days at a glance.</p>
      </div>
      <button @click="openCreateProjectModal" class="create-project-btn">
        Create Task
      </button>
    </div>

    <div class="vuecal-container">
      <vue-cal
        :selected-date="todayISO"
        active-view="week"
        :disable-views="['years', 'year']"
        :events="events"
        :time-from="0"
        :time-to="24 * 60"
        :time-step="60"
        :hide-weekends="false"
        :editable-events="{ title: true, drag: true, resize: true, delete: true, create: false }"
        style="height: 400px;"
      />
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal-btn" @click="closeModal">&times;</button>
        <h3>Create a Task</h3>

        <form @submit.prevent="addProject">
          <!-- Task Name -->
          <div class="form-group">
            <label for="projectName">Task Name:</label>
            <input type="text" id="projectName" v-model="newProject.title" required>
          </div>

          <!-- Recurring and Recur Until -->
          <div class="form-row">
            <div class="form-group">
              <label for="recurring">Recurring:</label>
              <select id="recurring" v-model="newProject.recurring">
                <option value="">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div class="form-group">
              <label for="recurUntil">Recur Until:</label>
              <input type="date" id="recurUntil" v-model="newProject.recurUntil" :required="newProject.recurring !== ''">
            </div>
          </div>

          <!-- Project Job and Project Office -->
          <div class="form-row">
            <div class="form-group">
              <label for="projectJob">Project Job:</label>
              <input type="text" id="projectJob" v-model="newProject.projectJob">
            </div>
            <div class="form-group">
              <label for="projectOffice">Project Office:</label>
              <input type="text" id="projectOffice" v-model="newProject.projectOffice">
            </div>
          </div>

          <!-- Stage and Timezone -->
          <div class="form-row">
            <div class="form-group">
              <label for="stage">Stage:</label>
              <select id="stage" v-model="newProject.stage">
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div class="form-group">
              <label for="timezone">Timezone:</label>
              <select id="timezone" v-model="newProject.timezone">
                <option value="utc-8">UTC-08:00 Pacific Time</option>
                <option value="utc-5">UTC-05:00 Eastern Time</option>
                <option value="utc+1">UTC+01:00 Central European Time</option>
              </select>
            </div>
          </div>

          <!-- Date, Start Time, End Time -->
          <div class="form-row">
            <div class="form-group">
              <label for="projectDate">Date:</label>
              <input type="date" id="projectDate" v-model="newProject.projectDate" required>
            </div>
            <div class="form-group">
              <label for="startTime">Start Time:</label>
              <input type="time" id="startTime" v-model="newProject.startTime" required>
            </div>
            <div class="form-group">
              <label for="endTime">End Time:</label>
              <input type="time" id="endTime" v-model="newProject.endTime" required>
            </div>
          </div>

          <!-- Color Picker -->
          <div class="form-group">
            <label>Color:</label>
            <div class="color-options">
              <span
                v-for="color in colorOptions"
                :key="color.class"
                :class="{ selected: newProject.class === color.class }"
                :style="{ backgroundColor: color.bg }"
                @click="newProject.class = color.class"
              />
            </div>
          </div>

          <!-- Notes -->
          <div class="form-group">
            <label for="projectNotes">Notes:</label>
            <textarea id="projectNotes" class="w-full border rounded" v-model="newProject.notes"></textarea>
          </div>

          <!-- Actions -->
          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
            <button type="submit" class="save-btn">Save</button>
          </div>

          <p v-if="formError" class="text-red-600 mt-2">{{ formError }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from 'axios'

/**
 * Axios instance – change baseURL to your API.
 * Example endpoints used below:
 *  - GET /tasks               -> returns array of tasks
 *  - POST /tasks              -> creates one task
 *
 * Each task should minimally include:
 * { id, title, startISO, endISO, class, meta: { ...your fields } }
 * OR you can return rrule info and expand on the client – this example
 * assumes the API returns expanded events (startISO/endISO per occurrence)
 */
const api = axios.create({
  baseURL: 'https://your-api.example.com',
  timeout: 15000
})

export default {
  name: 'CalendarView',
  components: { VueCal },
  data() {
    return {
      events: [],
      showModal: false,
      formError: '',
      newProject: {},
      colorOptions: [
        { class: 'green-event', bg: '#4CAF50' },
        { class: 'blue-event', bg: '#2196F3' },
        { class: 'orange-event', bg: '#FF9800' },
        { class: 'red-event', bg: '#F44336' },
        { class: 'purple-event', bg: '#9C27B0' },
        { class: 'teal-event', bg: '#009688' },
      ],
    }
  },
  computed: {
    todayISO() {
      return new Date().toISOString().slice(0, 10)
    }
  },
  async mounted() {
    await this.loadEventsFromAPI()
  },
  methods: {
    // ---- UI helpers ----
    openCreateProjectModal() {
      const today = new Date().toISOString().slice(0, 10)
      this.formError = ''
      this.newProject = {
        title: '',
        projectDate: today,
        startTime: '09:00',
        endTime: '10:00',
        class: 'green-event',
        recurring: '',
        recurUntil: '',
        projectJob: '',
        projectOffice: '',
        stage: 'planning',
        timezone: 'utc-8',
        notes: ''
      }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },

    // ---- Validation ----
    validateForm() {
      this.formError = ''
      if (!this.newProject.title) {
        this.formError = 'Please enter a task name.'
        return false
      }
      if (!this.newProject.projectDate || !this.newProject.startTime || !this.newProject.endTime) {
        this.formError = 'Please select date, start time, and end time.'
        return false
      }
      const start = new Date(`${this.newProject.projectDate}T${this.newProject.startTime}`)
      const end = new Date(`${this.newProject.projectDate}T${this.newProject.endTime}`)
      if (isNaN(start) || isNaN(end)) {
        this.formError = 'Invalid start or end time.'
        return false
      }
      if (end <= start) {
        this.formError = 'End time must be after start time.'
        return false
      }
      if (this.newProject.recurring && !this.newProject.recurUntil) {
        this.formError = 'Please select "Recur Until" for a recurring task.'
        return false
      }
      if (this.newProject.recurring && this.newProject.recurUntil) {
        const until = new Date(`${this.newProject.recurUntil}T23:59:59`)
        if (until < start) {
          this.formError = '"Recur Until" must be on or after the first occurrence.'
          return false
        }
      }
      return true
    },

    // ---- Recurrence expansion ----
    generateOccurrences(firstStart, firstEnd, recurring, recurUntilDate) {
      // returns an array of { start: Date, end: Date }
      const occurrences = []
      const until = recurUntilDate ? new Date(`${recurUntilDate}T23:59:59`) : null

      const pushOccurrence = (s, e) => occurrences.push({ start: new Date(s), end: new Date(e) })

      // Always include the first event
      pushOccurrence(firstStart, firstEnd)

      if (!recurring || !until) return occurrences

      const addDays = (date, days) => {
        const d = new Date(date)
        d.setDate(d.getDate() + days)
        return d
      }
      const addMonthsSafe = (date, months) => {
        const d = new Date(date)
        const day = d.getDate()
        d.setMonth(d.getMonth() + months)
        // handle shorter months by clamping to last day of target month
        if (d.getDate() < day) d.setDate(0)
        return d
      }

      let s = new Date(firstStart)
      let e = new Date(firstEnd)

      while (true) {
        if (recurring === 'daily') {
          s = addDays(s, 1)
          e = addDays(e, 1)
        } else if (recurring === 'weekly') {
          s = addDays(s, 7)
          e = addDays(e, 7)
        } else if (recurring === 'monthly') {
          s = addMonthsSafe(s, 1)
          e = addMonthsSafe(e, 1)
        } else {
          break
        }

        if (s > until) break
        pushOccurrence(s, e)
      }
      return occurrences
    },

    // ---- Event <-> API mapping ----
    toVueCalEvent(payload) {
      // Accepts either {startISO, endISO} or {start, end} Date strings
      const start = payload.startISO ? new Date(payload.startISO) : new Date(payload.start)
      const end = payload.endISO ? new Date(payload.endISO) : new Date(payload.end)
      return {
        start,
        end,
        title: payload.title,
        class: payload.class || 'green-event',
        content: payload.meta || {}
      }
    },

    // ---- API calls ----
    async loadEventsFromAPI() {
      try {
        // Example: GET /tasks returns an array of occurrences
        // [{
        //   id, title, startISO, endISO, class, meta: {recurring, projectJob, ...}
        // }]
        const { data } = await api.get('/tasks')
        this.events = Array.isArray(data) ? data.map(this.toVueCalEvent) : []
      } catch (err) {
        console.error('Failed to load events:', err)
        // Fallback to empty array on error
        this.events = []
      }
    },

    async postTaskToAPI(task) {
      // You can adapt this to your backend shape.
      // Here we post one *root* task with recurrence details; backend can expand
      // OR we can post each occurrence. Both examples below.

      // A) Post the ROOT task (backend handles expansion)
      // return api.post('/tasks', task)

      // B) Post EACH occurrence (client expansion). Example sends an array.
      return api.post('/tasks/bulk', task) // expecting backend to accept an array
    },

    // ---- Create task ----
    async addProject() {
      if (!this.validateForm()) return

      const firstStart = new Date(`${this.newProject.projectDate}T${this.newProject.startTime}`)
      const firstEnd = new Date(`${this.newProject.projectDate}T${this.newProject.endTime}`)

      const occs = this.generateOccurrences(
        firstStart,
        firstEnd,
        this.newProject.recurring,
        this.newProject.recurUntil
      )

      // Build vue-cal events
      const newEvents = occs.map(({ start, end }) => ({
        start,
        end,
        title: this.newProject.title,
        class: this.newProject.class,
        content: {
          recurring: this.newProject.recurring,
          recurUntil: this.newProject.recurUntil,
          projectJob: this.newProject.projectJob,
          projectOffice: this.newProject.projectOffice,
          stage: this.newProject.stage,
          timezone: this.newProject.timezone,
          notes: this.newProject.notes
        }
      }))

      // Optimistic update on the calendar
      this.events.push(...newEvents)

      // Prepare payload(s) for API
      // Example “bulk” payload with each occurrence:
      const payload = newEvents.map(ev => ({
        title: ev.title,
        startISO: ev.start.toISOString(),
        endISO: ev.end.toISOString(),
        class: ev.class,
        meta: { ...ev.content }
      }))

      try {
        await this.postTaskToAPI(payload)
      } catch (err) {
        console.error('Failed to save task(s):', err)
        // Optionally roll back UI on failure:
        // this.events = this.events.filter(e => !newEvents.includes(e))
      }

      this.closeModal()
    }
  }
}
</script>

<style>
/* Header styling */
.calendar-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 1rem;
}
.create-project-btn {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}
.create-project-btn:hover { background-color: #185abc; }

/* Vue-Cal container */
.vuecal-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
.vuecal__bg { overflow-y: auto; }
.vuecal__time-cell { font-size: 12px; color: #666; }
.vuecal__view-btn { text-transform: capitalize; }
.vuecal__view-btn--active { border-bottom: 2px solid #1a73e8 !important; font-weight: bold; }
.vuecal__event-time { font-size: 11px; }

/* Event colors */
.vuecal__event.green-event {background-color: rgba(76, 175, 80, 0.85); border: 1px solid #388E3C; color: #fff;}
.vuecal__event.blue-event {background-color: rgba(33, 150, 243, 0.85); border: 1px solid #1e88e5; color: #fff;}
.vuecal__event.orange-event {background-color: rgba(255, 152, 0, 0.85); border: 1px solid #fb8c00; color: #fff;}
.vuecal__event.red-event {background-color: rgba(244, 67, 54, 0.85); border: 1px solid #e53935; color: #fff;}
.vuecal__event.purple-event {background-color: rgba(156, 39, 176, 0.85); border: 1px solid #8e24aa; color: #fff;}
.vuecal__event.teal-event {background-color: rgba(0, 150, 136, 0.85); border: 1px solid #00897b; color: #fff;}

/* Modal */
.modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 1rem; }
.modal-content {
  background-color: white;
  padding: 25px 30px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  max-height: 90vh;
  overflow-y: auto;
}
.close-modal-btn { position: absolute; top: 10px; right: 15px; font-size: 28px; font-weight: bold; color: #aaa; background: none; border: none; cursor: pointer; }
.modal-content h3 { margin-top: 0; margin-bottom: 25px; color: #333; text-align: center; }

/* Form */
.form-row { display: flex; gap: 20px; }
.form-group { flex: 1; margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px; color: #555; }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-size: 14px; }
.form-group textarea { resize: vertical; min-height: 80px; }
.color-options { display: flex; align-items: center; gap: 10px; padding-top: 8px; flex-wrap: wrap; }
.color-options span { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: all 0.2s; }
.color-options span:hover { transform: scale(1.1); }
.color-options span.selected { border-color: #fff; box-shadow: 0 0 0 2px #1a73e8; }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
.form-actions button { padding: 10px 20px; border-radius: 5px; border: none; font-size: 14px; font-weight: 500; cursor: pointer; }
.cancel-btn { background-color: #f1f1f1; color: #333; }
.save-btn { background-color: #1a73e8; color: white; }

/* Responsive */
@media (max-width: 600px) {
  .form-row { flex-direction: column; gap: 0; }
}
</style>
