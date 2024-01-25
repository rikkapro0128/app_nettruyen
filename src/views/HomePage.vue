<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-refresher
        slot="fixed"
        :pull-factor="0.5"
        :pull-min="100"
        :pull-max="200"
        @ionRefresh="handleRefresh($event)"
      >
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-grid>
        <ion-row>
          <ion-col
            :size="getColumnSize()"
            v-for="manga in mangas"
            :key="manga.name"
          >
            <ion-card
              class="m-0"
              :button="true"
              @click="router.push(`/bio?path=${manga.src}`)"
            >
              <ion-img :src="`${NETTRUYEN_URL}${manga.thumbnail}`"></ion-img>
              <ion-card-header class="">
                <ion-card-subtitle>
                  {{ manga.details.net_update_at }}
                </ion-card-subtitle>
                <ion-card-title class="line-clamp-3 text-sm">{{
                  manga.name
                }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  RefresherCustomEvent,
  useIonRouter,
} from "@ionic/vue";

import { reactive, ref } from "vue";

interface Manga {
  name: string;
  src: string;
  thumbnail: string;
  statistical: {
    view: string;
    comment: string;
    like: string;
  };
  details: {
    name_other: string;
    type: Array<string>;
    status: string;
    net_update_at: string;
  };
}

const NETTRUYEN_URL = import.meta.env.VITE_NETTRUYEN_URL;
const router = useIonRouter();

const options = reactive({
  loading: false,
  patination: {
    start: 1,
    end: null,
    present: 1,
  },
});

const mangas = ref<Array<Manga> | []>([]);

const loadMangas = async () => {
  options.loading = true;
  try {
    const response = await fetch(
      `${import.meta.env.VITE_PROXY_URL}/manga/list?page=${
        options.patination.present
      }`
    );
    const res = await response.json();
    console.log(res);

    options.patination.start = res.pagination.min;
    options.patination.end = res.pagination.max;
    options.patination.present = res.pagination.at;

    mangas.value = res.body as Array<Manga>;
  } catch (error) {
    console.error(error);
  } finally {
    options.loading = false;
  }
};

const getColumnSize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1200) {
    return "2";
  } else if (screenWidth >= 768) {
    return "4";
  } else {
    return "6";
  }
};

const handleRefresh = async (event: RefresherCustomEvent) => {
  await loadMangas();
  event.target.complete();
};

loadMangas();
</script>

<style scoped></style>
