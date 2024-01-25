<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-img
        v-for="src in chapter.src"
        :key="src"
        :src="`${PROXY_URL}/manga/img?path=${src}`"
        alt="image-chapter"
      ></ion-img>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonImg } from "@ionic/vue";
import {} from "ionicons/icons";

import { useRoute } from "vue-router";

import { reactive } from "vue";

interface Chapter {
  update_at: string;
  src: Array<string | []>;
}

const PROXY_URL = import.meta.env.VITE_PROXY_URL;
const NETTRUYEN_URL = import.meta.env.VITE_NETTRUYEN_URL;

const route = useRoute();
const chapter = reactive<Chapter>({
  update_at: "",
  src: [],
});

const getChapter = async () => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_PROXY_URL
      }/manga/chapter?path=${route.query.path?.slice(1)}`
    );
    const data = await response.json();

    chapter.update_at = data.update_at_on_net;
    chapter.src = data.body;
  } catch (error) {
    console.log(error);
  }
};

if (route.query.path) {
  getChapter();
}
</script>

<style scoped></style>
