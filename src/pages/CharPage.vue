<template>
  <div class="row" style="padding: 1rem">
    <div class="col-12 col-sm-12 col-md-4">
      <q-img
        :src="state.character.image"
        sizes="(max-width: 400px) 500w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
        style="height: auto; max-width: 90%; margin: auto"
      />
    </div>
    <div class="col-12 col-sm-12 col-md-8">
      <div v-if="state.character.name" class="row">
        <div class="col-12 col-sm-12">
          <p class="text-green-9 text-h3" style="margin-bottom: 0">
            {{ state.character.name }}
          </p>
          <p class="text-grey-5 text-subtitle1">
            {{ state.character.gender }} {{ state.character.species }}
          </p>
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData label="Local" :text="state.character.location?.name" />
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData label="Origem" :text="state.character.origin?.name" />
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData label="Status" :text="state.character?.status" />
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData
            label="Tipo do local"
            :text="state.character.location?.type"
          />
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData
            label="Tipo da origem"
            :text="state.character.origin?.type"
          />
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData label="Tipo" :text="state.character.type" />
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData
            label="Dimensão do local"
            :text="state.character.location?.dimension"
          />
        </div>
        <div class="col-12 col-sm-12 col-md-4">
          <ShowData
            label="Dimensão da origem"
            :text="state.character.origin?.dimension"
          />
        </div>
        <div class="col-12 col-sm-12">
          <p class="text-green-9 text-weight-medium text-body1">Episodios</p>
          <EpisodeList :episodes="state.character?.episode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShowData from 'src/components/ShowData.vue';
import EpisodeList from 'src/components/EpisodeList.vue';
import { reactive } from 'vue';
import { Character } from 'src/models/Character';
import { ResponseCharacterId } from 'src/models/General';
import { GetUnique } from 'src/queries/Character';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const id = route.params.id;

interface CharPage {
  character: Character;
}

const state: CharPage = reactive({
  character: {},
});

const getCharacter = async () => {
  const Query = {
    query: GetUnique,
    variables: {
      id: id,
    },
  };

  const { data }: ResponseCharacterId = await axios({
    url: 'https://rickandmortyapi.com/graphql',
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    data: Query,
  });

  const results: Character = data.data.character;

  state.character = results;
};

getCharacter();
</script>

<style>
.episode-wrapper {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  margin-bottom: 0.8rem;
  border-radius: 5px;
}
</style>
