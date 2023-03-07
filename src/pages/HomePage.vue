<template>
  <div class="header-wrapper">
    <p class="text-h5 text-weight-medium text-green-9">
      Personagens de Rick e Morty
    </p>
    <q-input
      v-model="state.search"
      label="Pesquise um personagem"
      :dense="state.dense"
      style="width: 30%"
    >
      <template v-slot:append>
        <q-icon
          v-if="state.search !== ''"
          name="close"
          @click="() => clearSearch()"
          class="cursor-pointer"
        />
      </template>
      <template v-slot:after>
        <q-btn round dense flat icon="search" @click="() => getCharacters()" />
      </template>
    </q-input>
  </div>
  <div
    v-if="state.loading"
    class="row items-center justify-evenly"
    style="height: 100%"
  >
    <q-circular-progress
      indeterminate
      size="50px"
      :thickness="0.22"
      rounded
      color="lime"
      track-color="grey-3"
      class="q-ma-md"
    />
  </div>
  <div v-else>
    <q-page class="items-center">
      <ListaGeral :characters="state.characters" />
    </q-page>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="state.current"
        :max="state.maxPage"
        :max-pages="6"
        @update:model-value="() => paginate()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ListaGeral from 'src/components/ListaGeral.vue';
import axios from 'axios';
import { reactive } from 'vue';
import { GetAll } from 'src/queries/Character';
import { Character } from '../models/Character';
import { ResponseCharacter, Info } from '../models/General';

interface HomeProps {
  search?: string;
  page?: number;
  dense?: boolean;
  characters?: Array<Character>;
  maxPage: number;
  nextPage?: number;
  prevPage?: number;
  current: number;
  loading: boolean;
}

const state: HomeProps = reactive({
  search: '',
  page: 1,
  dense: false,
  characters: [],
  maxPage: 0,
  nextPage: 0,
  prevPage: 0,
  current: 1,
  loading: false,
});

const clearSearch = () => {
  state.search = '';
  state.page = 1;
  getCharacters();
};

const paginate = () => {
  state.page = state.current;
  getCharacters();
};

const getCharacters = async () => {
  state.loading = true;
  const Query = {
    query: GetAll,
    variables: {
      name: state.search,
      page: state.page,
    },
  };

  const { data }: ResponseCharacter = await axios({
    url: 'https://rickandmortyapi.com/graphql',
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    data: Query,
  });

  const results: Array<Character> = data.data.characters.results;
  const info: Info = data.data.characters.info;

  state.loading = false;
  state.characters = results;
  state.maxPage = info.pages;
  state.nextPage = info.next;
  state.prevPage = info.prev;
};

getCharacters();
</script>

<style>
.header-wrapper {
  padding: 1rem;
}
</style>
