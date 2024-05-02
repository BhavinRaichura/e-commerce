    
<script >
export default {
    data: function(){
        return {
            products: []
        }
    },
    beforeMount: async function(){
        console.log("before mount")
        let response = await fetch(`http://localhost:4000/product`,{
            method: 'get'
        })
        let data = await response.json()
        console.log("data: ",data.data);
        this.products = await data.data
        console.log("products", this.products)
    }
}
    
</script>


<template > 
<div>
    <h1>products</h1>
    <div v-for="product in products" :key="product.id">
        <p>{{product.title}}</p>
    </div>
    


</div>
</template>
