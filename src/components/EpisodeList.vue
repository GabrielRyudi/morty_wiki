<template>
  <div class="row q-gutter-sm">
    <q-dialog v-model="state.showModal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ state.episode.name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item
              v-for="char in state.episode.characters"
              :key="char.id"
              @click="() => reloadPage(char.id)"
              clickable
            >
              <q-item-section avatar top>
                <q-avatar rounded size="80px">
                  <img :src="char.image" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium" style="margin-right: 0.6rem">
                    {{ char.name }}
                  </span>
                  <span class="text-grey-8">
                    {{ char.gender }} {{ char.species }}
                  </span>
                </q-item-label>
                <q-item-label caption lines="1">
                  {{ char.status }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div
      v-for="episode in episodes"
      :key="episode.id"
      class="col-12 col-sm-12 col-md-5"
    >
      <q-item class="episode-wrapper">
        <q-item-section>
          <q-item-label>{{ episode.name }}</q-item-label>
          <q-item-label caption lines="1">
            {{ episode.air_date }} - {{ episode.episode }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn
            square
            flat
            color="black"
            icon="share"
            @click="() => setEpisode(episode)"
          />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Episode } from 'src/models/Episode';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const route = useRouter();

const reloadPage = (id?: number) => {
  route.push({ path: '/character/' + id }).then(() => route.go(0));
};

interface Props {
  episodes: Array<Episode>;
}

interface EpisodeList {
  showModal: boolean;
  episode: Episode;
}

const state: EpisodeList = reactive({
  showModal: false,
  episode: {},
});

const setEpisode = (episode: Episode) => {
  state.episode = episode;
  state.showModal = true;
};

withDefaults(defineProps<Props>(), {
  episodes: () => [],
});
</script>
