<template>
  <ion-app>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="backHandle">
              <ion-icon
                slot="icon-only"
                :icon="isHomePage ? homeOutline : chevronBack"
              ></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-buttons slot="secondary">
            <ion-button>
              <ion-icon slot="icon-only" :icon="search"></ion-icon>
            </ion-button>
          </ion-buttons>
          <ion-title>Trang chủ</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-router-outlet />
      </ion-content>
    </ion-page>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonPage,
  IonRouterOutlet,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  useIonRouter
} from "@ionic/vue";
import { search, homeOutline, chevronBack } from "ionicons/icons";

import { watch, ref } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";

const route = useRoute();
const ionRouter = useIonRouter();

const isHomePage = ref(true);

const checkRoute = (route: RouteLocationNormalizedLoaded) => {
  if (route.name === "Home") {
    isHomePage.value = true;
  } else {
    isHomePage.value = false;
  }
};

const backHandle = () => {
  console.log(route.name);
  
  if (!isHomePage.value) {
    ionRouter.back();
  }
};

watch(route, (to) => {
  checkRoute(to);
});

checkRoute(route);
</script>
