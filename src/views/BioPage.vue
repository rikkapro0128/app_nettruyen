<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="m-4">
        <div class="flex">
          <div class="max-h-[174px] min-w-[120px] rounded-md shadow-md">
            <img
              class="block max-h-[174px] object-contain"
              :src="`${NETTRUYEN_URL}${bio.thumbnail}`"
              alt="thumbnail"
            />
          </div>
          <div class="ml-4 text-base text-left grid grid-cols-1 gap-2">
            <p class="font-bold">{{ bio.name }}</p>
            <p class="text-sm">
              <b>Tên khác</b>: {{ bio.details.name_other ?? "Không có" }}
            </p>
            <p class="text-sm"><b>Tác giả</b>: {{ bio.details.author }}</p>
            <p class="text-sm">
              <b>Đánh giá</b>: {{ bio.details.rate_star_on_net }}/5 ({{
                bio.details.rate_num_on_net
              }}
              lượt)
            </p>
            <p class="text-sm">
              <b>Theo dõi</b>: {{ bio.details.follow_on_net }}
            </p>
            <p class="text-sm"><b>Tình trạng</b>: {{ bio.details.status }}</p>
            <p class="text-sm"><b>Thể loại</b>: {{ bio.details.type }}</p>
          </div>
        </div>
        <div class="line-clamp-[8]">
          <p class="text-base uppercase">Mô tả</p>
          <p v-if="loading" class="text-sm text-slate-400">
            {{ bio.details.description }}
          </p>
          <div v-else>
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
            <ion-skeleton-text :animated="true"></ion-skeleton-text>
          </div>
        </div>
        <div>
          <div>
            <h1 class="text-base uppercase">Danh sách chapter</h1>
          </div>
          <ion-button
            color="light"
            class="my-3 flex"
            :key="chapter.src"
            v-for="chapter in bio.chapters"
            @click="router.push(`/chapter?path=${chapter.src}`)"
          >
            <div class="w-full flex justify-between items-center">
              <p class="text-slate-300">{{ chapter.chapter }}</p>
              <div class="flex items-center">
                <p class="mr-2 text-slate-400 text-xs">
                  {{ chapter.update_at }}
                </p>
                <ion-icon
                  color="success"
                  :icon="arrowForwardCircleOutline"
                  size="primary"
                ></ion-icon>
              </div>
            </div>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonPage,
  IonIcon,
  IonButton,
  useIonRouter,
  IonSkeletonText,
} from "@ionic/vue";
import { arrowForwardCircleOutline } from "ionicons/icons";

import { useRoute } from "vue-router";

import { reactive, ref } from "vue";

interface Bio {
  thumbnail: string;
  name: string;
  net_update_at: string;
  details: {
    follow_on_net: string;
    rate_num_on_net: string;
    rate_star_on_net: string;
    view_on_net: string;
    author: string;
    name_other?: string;
    type: Array<string>;
    status: string;
    description?: string;
  };
  chapters: Array<{
        chapter: string;
        src: string;
        update_at: string;
      }
  > | [];
}

const NETTRUYEN_URL = import.meta.env.VITE_NETTRUYEN_URL;

const route = useRoute();
const router = useIonRouter();

const bio = reactive<Bio>({
  name: "",
  thumbnail: "",
  net_update_at: "",
  details: {
    follow_on_net: "",
    rate_num_on_net: "",
    rate_star_on_net: "",
    view_on_net: "",
    author: "",
    name_other: "",
    type: [],
    status: "",
    description: "",
  },
  chapters: [],
});
const loading = ref(false);

const getBio = async () => {
  try {
    loading.value = true;
    const response = await fetch(
      `${
        import.meta.env.VITE_PROXY_URL
      }/manga/bio?path=${route.query.path?.slice(1)}`
    );
    const data = await response.json();
    console.log(data);
    bio.details = data.body.details as Bio["details"];
    bio.name = data.body.name;
    bio.net_update_at = data.body.last_update;
    bio.thumbnail = data.body.thumbnail;

    bio.chapters = data.body.chapters;
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

if (route.query.path) {
  getBio();
}
</script>

<style scoped>
ion-skeleton-text {
  margin: 0.5rem 0;
  height: 1rem;
}
</style>
