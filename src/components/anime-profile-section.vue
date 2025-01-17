<script setup lang="ts">
  import { computed } from 'vue';
  import { PhStar } from '@phosphor-icons/vue';

  const props = defineProps<{
    info: { [key: string]: any };
  }>();

  const formattedRating = computed(() => {
    const ratings: { [key:string] : any } = {
      'All Ages': 'G',
      'Children': 'PG',
      'Teens 13 or older': 'PG-13',
      'Violence & profanity': 'R-17+',
      'Mild nudity': 'R+',
      'Hentai': 'Rx',
    };
    
    if (!props.info.rating) return '';

    const ratingsKey = Object.keys(ratings);
    const ratingsIndex = ratingsKey.findIndex((rating) => props.info.rating.toLowerCase().includes(rating.toLowerCase()));

    if (ratingsIndex === -1) return '';

    const foundRatingKey = ratingsKey[ratingsIndex];
    const foundRatingValue = ratings[foundRatingKey];

    return foundRatingValue;
  });

  const formattedDuration = computed(() => {
    if (!props.info.duration) return '?';

    const splitDuration = props.info.duration.split('per');

    return splitDuration[0];
  });

  const formattedGenre = computed(() => {
    if (!props.info.genres) return '?';

    const genresNameArr = props.info.genres.map((g: { [key:string]: any }) => g.name);

    return genresNameArr.join(', ');
  });

  const formattedReleaseDate = computed(() => {
    if (!props.info.aired) return '?';

    const splitAiredObjString = props.info.aired.string.split('to');

    return splitAiredObjString[0];
  });

  const detailsArr = computed<{ label: string; value: any; }[]>(() => {
    if (!props.info) return [];

    return [
      {
        label: 'Type',
        value: props.info.type || '?',
      },
      {
        label: 'Genre',
        value: formattedGenre.value,
      },
      {
        label: 'Release',
        value: formattedReleaseDate.value || '?',
      },
      {
        label: 'Season',
        value: props.info.season || '?',
      },
    ];
  });

</script>

<template>
  <div class="anime-profile-section">
    <div class="anime-profile-section__img">
      <img :src="info.images.jpg.image_url" alt="Anime profile section image" />
    </div>
    <div class="anime-profile-section__info">
      <h1 class="title">{{ info.title_english || info.title }}</h1>
      <div class="meta">
        <p v-if="formattedRating" class="rating pill-container">{{ formattedRating }}</p>
        <div v-if="info.score" class="score">
          <ph-star :size="12" weight="fill" />
          <p>{{ info.score }}</p>
        </div>
        <p v-if="info.year" class="year">{{ info.year }}</p>
        <p v-if="formattedDuration" class="duration">{{ formattedDuration }}</p>
      </div>
      <p class="description">{{ info.synopsis }}</p>
      <div class="details">
        <div v-for="(detail, index) in detailsArr" :key="index" 
             class="detail">
          <div class="label">{{ detail.label }}:</div>
          <div class="value">{{ detail.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .anime-profile-section {
    @extend %flex-row;
    flex-wrap: nowrap;
    gap: space(m);

    @media only screen and (max-width: 680px) {
      flex-direction: column;
    }

    &__img {
      max-width: 400px;
      
      img {
        border-radius: 8px;
        overflow: hidden;
      }
    }

    &__info {

      > * {
        &:not(:last-child),
        &:not(:first-child) {
          margin-bottom: space(xs);
        }
      }
      
      .title {
        font-size: font(big-font-size);
      }

      .meta {
        @extend %flex-row--center-y;
        font-size: font(smaller-font-size);
        gap: space(s);

        .score {
          @extend %flex-row--center-y;
          gap: 4px;
        }
      }

      .description {
        font-size: font(small-font-size);
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        white-space: normal;
        max-width: 100%;
        -webkit-line-clamp: 5;
        line-height: 22px;
        -webkit-box-orient: vertical;
        text-align: justify;
      }
    }

    .details {
      .detail {
        @extend %flex-row--center-y;
        font-size: font(small-font-size);
        text-transform: capitalize;

        &:not(:last-child) {
          margin-bottom: space(xs);
        }

        .label {
          font-weight: 300;
          min-width: 70px;
        }
      }
    }
  }
</style>
