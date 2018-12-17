<template>
    <div class="movie-sessions">
        <div v-for="session in filteredSessions(sessions)" class="session-time-wrapper">
            <div class="session-time">{{formatSessionTime(session.time)}}</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['sessions', 'day', 'time', 'moviePassesTimeFilter'],
        methods: {
            formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions) {
                return sessions.filter(this.moviePassesTimeFilter)
            },
        }
    }
</script>