<template>
    <div class="country__table">
        <div class="country__header">
            <div>№ п/п</div>
            <div>Название страны</div>
            <div>Количество жителей</div>
            <div>Столица</div>
            <div>Месторасположение</div>
            <div>Краткое описание</div>
        </div>
        <div class="country__rows">
            <div class="country__row" v-for="(country, index) in getCountries" :key="index">
                <div class="country__cells">{{ index + 1 }}</div>
                <div class="country__cells">{{ country.name }}</div>
                <div class="country__cells">{{ country.population }}</div>
                <div class="country__cells">{{ country.capital }}</div>
                <div class="country__cells">{{ country.location }}</div>
                <div class="country__cells">{{ country.description }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'grid-table',
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters({
            getCountries: 'getCountries',
        }),
    },
};
</script>

<style scoped lang="scss">
.country {
    &__table {
        display: grid;
        gap: 10px;
    }

    &__header {
        display: grid;
        grid-template-columns: max-content repeat(5, 1fr);
        font-weight: bold;
        background-color: #f2f2f2;
        padding: 10px;
    }

    &__rows {
        display: grid;
        gap: 10px;
    }

    &__row {
        display: grid;
        grid-template-columns: max-content repeat(5, 1fr);
        border: 1px solid #ccc;
    }

    &__cells {

        padding: 5px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: scroll;
        border: 1px solid #ccc;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>