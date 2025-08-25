<template>
  <div class="calendar-card">
    <div class="calendar-header">
      <div>
        <h2>Calender</h2>
        <p>Quickly identify deadlines or important days at a glance.</p>
      </div>
      <button @click="openCreateProjectModal" class="create-project-btn">
        Create Task
      </button>
    </div>

    <div class="vuecal-container">
      <vue-cal
        :selected-date="'2025-06-16'"
        active-view="week"
        :disable-views="['years', 'year']"
        :events="events"
        :time-from="0 * 60"
        :time-to="24 * 60"
        :time-step="60"
        :hide-weekends="true"
        :editable-events="{ title: false, drag: true, resize: true, delete: true, create: false }"
        style="height: 400px;"
      >
      </vue-cal>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal-btn" @click="closeModal">&times;</button>
        <h3>Create a Task</h3>
        <form @submit.prevent="addProject">
          <div class="form-group">
            <label for="projectName">Task Name:</label>
            <input type="text" id="projectName" v-model="newProject.title" required>
          </div>

          <div class="form-row">

          <div class="form-group">
              <label for="projectDate">Date:</label>
              <input type="date" id="projectDate" v-model="newProject.projectDate" required>
          </div>
           <div class="form-group">
              <label>Color:</label>
              <div class="color-options">
                <span
                  v-for="color in colorOptions"
                  :key="color.class"
                  :class="{ selected: newProject.class === color.class }"
                  :style="{ backgroundColor: color.bg }"
                  @click="newProject.class = color.class"
                ></span>
              </div>
          </div>
        </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="startTime">Start Time:</label>
              <input type="time" id="startTime" v-model="newProject.startTime" required>
            </div>
            <div class="form-group">
              <label for="endTime">End Time:</label>
              <input type="time" id="endTime" v-model="newProject.endTime" required>
            </div>
          </div>
          
         

          
         <div class="form-group">
            <label for="projectName">Task Description:</label>
            <textarea name="" id="" class="w-full border rounded" ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
            <button type="submit" class="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  name: 'CalendarView',
  components: { VueCal },
  data() {
    return {
      events: [],
      showModal: false,
      newProject: {}, // Will be populated when modal opens
      colorOptions: [
        { class: 'green-event', bg: '#4CAF50' },
        { class: 'blue-event', bg: '#2196F3' },
        { class: 'orange-event', bg: '#FF9800' },
        { class: 'red-event', bg: '#F44336' },
      ],
    };
  },
  methods: {
    // Set default values for the form when opening the modal
    openCreateProjectModal() {
      const today = new Date().toISOString().slice(0, 10);
      this.newProject = {
        title: '',
        projectDate: today,
        startTime: '09:00',
        endTime: '10:00',
        class: 'green-event' // Default event color
      };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addProject() {
      // Create start and end Date objects from the simplified form
      const startDate = new Date(`${this.newProject.projectDate}T${this.newProject.startTime}`);
      const endDate = new Date(`${this.newProject.projectDate}T${this.newProject.endTime}`);

      // Push the new event to the events array.
      // vue-cal will automatically display the title and time.
      this.events.push({
        start: startDate,
        end: endDate,
        title: this.newProject.title,
        class: this.newProject.class, // For styling the event
      });

      this.closeModal();
    }
  }
};
</script>

<style>
/* Main card container */
.calendar-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  max-width: 900px; /* Optional: constrain width */
  margin: auto; /* Optional: center card on page */
}

/* Header styling */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertically center align title and button */
  margin-bottom: 20px;
}
.calendar-header h2 { margin: 0; font-size: 22px; color: #333; }
.calendar-header p { margin: 4px 0 0; color: #666; font-size: 14px; }
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
  white-space: nowrap; /* Prevent button text from wrapping */
}
.create-project-btn:hover { background-color: #185abc; }

/* Vue-Cal specific styling */
.vuecal-container {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
/* This makes the time column scrollable */
.vuecal__bg { overflow-y: auto; }
.vuecal__time-cell { font-size: 12px; color: #666; }
.vuecal__view-btn { text-transform: capitalize; }
.vuecal__view-btn--active { border-bottom: 2px solid #1a73e8 !important; font-weight: bold; }
.vuecal__event-time { font-size: 11px; }

/* Custom Event Colors */
.vuecal__event.green-event {background-color: rgba(76, 175, 80, 0.85); border: 1px solid #388E3C; color: #fff;}
.vuecal__event.blue-event {background-color: rgba(33, 150, 243, 0.85); border: 1px solid #1e88e5; color: #fff;}
.vuecal__event.orange-event {background-color: rgba(255, 152, 0, 0.85); border: 1px solid #fb8c00; color: #fff;}
.vuecal__event.red-event {background-color: rgba(244, 67, 54, 0.85); border: 1px solid #e53935; color: #fff;}

/* Modal styles */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background-color: white; padding: 25px 30px; border-radius: 8px; width: 90%; max-width: 450px; position: relative; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.close-modal-btn { position: absolute; top: 10px; right: 15px; font-size: 28px; font-weight: bold; color: #aaa; background: none; border: none; cursor: pointer; }
.modal-content h3 { margin-top: 0; margin-bottom: 25px; color: #333; text-align: center; }

/* Simplified Form styles */
.form-row { display: flex; gap: 20px; }
.form-group { flex: 1; margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 500; font-size: 14px; color: #555; }
.form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; font-size: 14px; }
.color-options { display: flex; align-items: center; gap: 10px; padding-top: 8px; }
.color-options span { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 3px solid transparent; transition: all 0.2s; }
.color-options span:hover { transform: scale(1.1); }
.color-options span.selected { border-color: #fff; box-shadow: 0 0 0 2px #1a73e8; }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
.form-actions button { padding: 10px 20px; border-radius: 5px; border: none; font-size: 14px; font-weight: 500; cursor: pointer; }
.cancel-btn { background-color: #f1f1f1; color: #333; }
.save-btn { background-color: #1a73e8; color: white; }
</style>