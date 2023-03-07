<template>
  <div class="row" style="padding: 1rem">
    <div
      v-for="character in characters"
      :key="character.id"
      class="col-sm-24 col-md-6"
    >
      <div class="char-wrapper">
        <q-item>
          <q-item-section avatar top>
            <q-avatar rounded size="80px">
              <img :src="character.image" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-medium" style="margin-right: 0.6rem">
                {{ character.name }}
              </span>
              <span class="text-grey-8">
                {{ character.gender }} {{ character.species }}
              </span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ character.status }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="fa-solid fa-eye"
                @click="() => goToChar(character.id)"
              />
            </div>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Character } from '../models/Character';
import { useRouter } from 'vue-router';

const route = useRouter();

interface Props {
  characters: Character[];
}

withDefaults(defineProps<Props>(), {
  characters: () => [],
});

const goToChar = (id?: number) => {
  route.push({ path: '/character/' + id }).then(() => route.go(0));
};
</script>

<style>
.char-wrapper {
  width: 95%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  margin-bottom: 0.8rem;
  border-radius: 5px;
}
</style>
