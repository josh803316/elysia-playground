<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUser, useAuth } from '@clerk/vue';
import AppLayout from '../components/AppLayout.vue';
import NotesGrid from '../components/NotesGrid.vue';
import NoteFormModal from '../components/NoteFormModal.vue';
import AdminNotesTable from '../components/AdminNotesTable.vue';
import { usePrivateNotes } from '../composables/usePrivateNotes';
import { useAdmin } from '../composables/useAdmin';

const { isSignedIn } = useUser();
const { getToken } = useAuth();
const router = useRouter();

const { notes, loading, error, fetchPrivateNotes } = usePrivateNotes();
const { isAdminLoggedIn, adminApiKey, allNotes, loading: adminLoading, error: adminError, fetchAllNotes } = useAdmin();

const showModal = ref(false);

onMounted(async () => {
  if (!isSignedIn.value && !isAdminLoggedIn.value) {
    await router.push('/');
    return;
  }
  if (isSignedIn.value) {
    const token = await getToken.value();
    if (token) await fetchPrivateNotes(token);
  }
  if (isAdminLoggedIn.value) await fetchAllNotes();
});

watch(isSignedIn, async (val) => {
  if (!val && !isAdminLoggedIn.value) {
    await router.push('/');
  }
});

async function refresh() {
  if (isSignedIn.value) {
    const token = await getToken.value();
    if (token) await fetchPrivateNotes(token);
  }
  if (isAdminLoggedIn.value) await fetchAllNotes();
}

async function handleSubmitted() {
  showModal.value = false;
  await refresh();
}
</script>

<template>
  <AppLayout>
    <div class="flex flex-col gap-6">
      <!-- Admin All Notes Table -->
      <AdminNotesTable
        v-if="isAdminLoggedIn"
        :notes="allNotes"
        :loading="adminLoading"
        :error="adminError"
        :admin-api-key="adminApiKey"
        @refetch="fetchAllNotes()"
      />

      <!-- User's Notes -->
      <section v-if="isSignedIn" class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold text-gray-800">My Notes</h2>
            <p class="text-sm text-gray-500 mt-0.5">Your private and public notes</p>
          </div>
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded text-white text-sm font-medium bg-purple-600 hover:bg-purple-700"
            @click="showModal = true"
          >
            <span class="text-base leading-none">+</span>
            Create Private Note
          </button>
        </div>
        <p v-if="loading" class="text-gray-500 text-sm">Loading your notes…</p>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <NotesGrid
          :notes="notes"
          empty-message="No notes yet. Create your first note using the button above!"
          :show-user="false"
          @deleted="refresh()"
          @updated="refresh()"
        />
      </section>
    </div>

    <NoteFormModal
      v-if="showModal"
      :initial-is-public="false"
      @submitted="handleSubmitted"
      @close="showModal = false"
    />
  </AppLayout>
</template>
