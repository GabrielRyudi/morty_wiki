<template>
  <div class="row items-center justify-evenly" style="height: 100vh">
    <div class="q-pa-md login-wrapper">
      <p class="text-h4 text-green-9 text-weight-medium" style="margin: 0">
        Bem vindo ao Morty Wiki
      </p>
      <p class="text-body1 text-grey-8 q-mb-xl">
        Forneça seu email e seu username
      </p>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="state.name"
          label="Username"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="email"
          v-model="state.email"
          label="E-mail"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
          ]"
        />

        <div>
          <q-btn label="Entrar" type="submit" color="primary" />
          <q-btn
            label="Limpar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { saveUser } from 'src/utils/userData';
import { useRouter } from 'vue-router';

const route = useRouter();

interface LoginPage {
  name: string;
  email: string;
}

const state: LoginPage = reactive({
  name: '',
  email: '',
});

const onSubmit = () => {
  saveUser(state.name, state.email);
  route.push({ path: '/home' }).then(() => route.go(0));
};

const onReset = () => {
  state.name = '';
  state.email = '';
};
</script>

<style>
.login-wrapper {
  width: 30%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  margin-bottom: 0.8rem;
  border-radius: 5px;
}
</style>
