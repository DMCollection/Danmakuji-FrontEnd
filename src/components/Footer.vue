<template>
    <div class="f-container">
        <p class="site-footer__copyright">© 2018 Axosoft, LLC. &nbsp;Made with 
            <i class="fa fa-heart"></i> in Scottsdale, Arizona.
            </p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.f-container{
    background-color: #141422;
    position: relative;
    bottom: 0;
}
.site-footer__copyright {
    text-align: center;
    margin-top: 5px;
}
p {
    font-family: 'Open Sans',sans-serif;
}
.fa-heart {
    color: #f33800;
    margin-left: .2em;
    margin-right: .2em;
}
.fa {
    display: inline-block;
    font: 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.fa-heart:before {
    content: "\f004";
}
</style>


