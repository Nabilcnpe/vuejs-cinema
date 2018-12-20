<template>
    <div class="movie-sessions">
        <div v-for="session in filteredSessions(sessions)" class="session-time-wrapper">
            <div class="session-time" v-on:mouseover="showSeats(session)" v-on:mouseleave="hideSeats">{{formatSessionTime(session.time)}}</div>
        </div>
        <div class="seats" v-show="availableSeats">{{seats}}</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                seats: null,
                availableSeats: false,
            }
        },
        props: ['sessions', 'day', 'time', 'moviePassesTimeFilter'],
        methods: {
            formatSessionTime(raw) {
                return this.$moment(raw).format('h:mm A');
            },
            filteredSessions(sessions) {
                return sessions.filter(this.moviePassesTimeFilter)
            },
            showSeats(session) {
                this.availableSeats = true;
                if(session.seats === 0) {
                    return this.seats = `No available seats for this session`
                } else {
                    return this.seats = `Available seats: ${session.seats}`;
                }
            },
            hideSeats() {
                this.availableSeats = false;
            },
        }
    }
</script>