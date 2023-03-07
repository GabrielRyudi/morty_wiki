<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-green-9">
      <q-toolbar>
        <q-toolbar-title> Rick And Morty Wikia </q-toolbar-title>
        <q-btn flat square dense icon-right="more_vert">
          {{ name }}
          <q-menu v-model="state.showMenu" :offset="[0, 10]">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/home">
                <q-item-section> Personagens </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="() => logout()">
                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <Suspense>
        <router-view />

        <template #fallback> Loading... </template>
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { clearUser, getUser } from 'src/utils/userData';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const route = useRouter();
const { name } = getUser();

const state = reactive({
  showMenu: false,
  name: name,
});

const logout = () => {
  clearUser();
  route.push({ path: '/' }).then(() => route.go(0));
};
</script>
