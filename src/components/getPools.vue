<script>
import axios from "axios"
export default {
    setup() {
        function getPools() {
            axios
            .get('https://pool.flazzard.com/api/pools')
            .then((response) => {
                //console.log(response.data.pools)
                pools.value =response.data.pools
                console.log(response.data.pools)
            })
            .catch((error) => {
                console.log(error)
            })
        }
        return {
            getPools
        }
    }
}
</script>