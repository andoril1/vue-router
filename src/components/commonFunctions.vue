<template>
  
</template>

import axios from "axios"
import {ref, computed, watch,} from 'vue'
import {defineExpose} from 'vue';
export default {
    setup() {
        const pools = ref([]);
        const showPplns = ref(false);
        const showSolo = ref(false);
        const schemeButtonText = ref("SOLO");

        defineExpose({
            formatHashrate
        });

        const selectedScheme = computed(function() {
            if(!showSolo.value) {
                //show if PPLNS - Button is pressed
                return pools.value.filter((pool) => pool.paymentProcessing.payoutScheme=="PPLNS")
            }else if(showSolo.value) {
                //Show if SOLO - Button is pressed
                return pools.value.filter((pool) => pool.paymentProcessing.payoutScheme=="SOLO")
            }else{
                //Show if no Button is pressed
                return pools.value.filter((pool) => pool.paymentProcessing.payoutScheme)
            }
        });
        watch(pools,(newValue,oldValue) => { 
            if(newValue != oldValue) {
                setInterval(() => {
                    getPools()
                }, 60000);
        }});
        function soloPressed() {
            showSolo.value = !showSolo.value
            if(showSolo.value){
                schemeButtonText.value = "PPLNS"
            }
            else if(!showSolo.value)
                schemeButtonText.value = "SOLO"
            
            console.log(schemeButtonText.value)
        }
        function paymentScheme(coinName,coinScheme) {
            if (coinScheme == "SOLO")
            return coinName + " [SOLO]"
            else return coinName
        }
        function formatHashrate(value, decimal, unit) {
        if (value === 0) {
            return "0 " + unit;
        } else {
            var si = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
            { value: 1e21, symbol: "Z" },
            { value: 1e24, symbol: "Y" }
            ];
            for (var i = si.length - 1; i > 0; i--) {
            if (value >= si[i].value) {
                break;
            }
            }
            return ((value / si[i].value).toFixed(decimal).replace(/.0+$|(.[0-9]*[1-9])0+$/, "$1") + " " + si[i].symbol + unit);
            }
        }
        function getPools() {
            axios
            .get('https://pool.flazzard.com/api/pools')
            .then((response) => {
                //console.log(response.data.pools)
                pools.value =response.data.pools
                //console.log(response.data.pools)
            })
            .catch((error) => {
                console.log(error)
            })
            
        }
        function getTimeAgoAdmin(date) {
            date=new Date(date)
        if (!date || isNaN(date.getTime())) {
            return "NEVER";
        }
        var now = new Date();
        var diff = now.getTime() - date.getTime();
        var seconds = Math.floor(diff / 1000);
        if (seconds < 60) {
            return "NOW";
        }
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
        var months = Math.floor(days / 30);
        if (months >= 1) {
            return months + " month" + (months > 1 ? "s" : "");
        } else if (days >= 2) {
            return days + " day" + (days > 1 ? "s" : "");
        } else if (hours >= 48) {
            return "2 days";
        } else if (hours >= 2) {
            return hours + " hours";
        } else if (minutes >= 2) {
            return minutes + " min" + (minutes > 1 ? "s" : "");
        } else {
            return "NOW";
        }
    }
        function renderTimeAgoBox(date) {
        var textColor = 'white';
        var borderRadius = '.25em';
        var bgColor = '';
        var timeAgo = this.getTimeAgoAdmin(date);
        if (timeAgo === "NEVER" || timeAgo === "NOW") {
            bgColor = (timeAgo === "NEVER") ? '#666666' : '#00c000';
        } else if (timeAgo.includes("month")) {
            bgColor = '#d1941f'; // Orange for months
        } else if (timeAgo.includes("day")) {
            bgColor = '#c0c000'; // Yellow for days
        } else if (timeAgo.includes("hour")) {
            bgColor = '#008000'; // Dark green for hours
        } else if (timeAgo.includes("min")) {
            bgColor = '#00c000'; // Bright green for minutes
        }
        return "<div class='d-flex align-items-center justify-content-center' style='background-color:" + bgColor + "; color: " + textColor + "; border-radius: " + borderRadius + "; width: 100%; padding: 2px; font-size: 75%; font-weight: 700; text-align: center; height: 20px;'>" + timeAgo + "</div>";
        }
        return {
            showPplns,
            showSolo,
            pools,
            selectedScheme,
            paymentScheme,
            getPools,
            getTimeAgoAdmin,
            renderTimeAgoBox,
            formatHashrate,
            soloPressed,
            schemeButtonText
        }
    }


<style>

</style>