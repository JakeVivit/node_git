
<template>
    <div>
        <header-top></header-top>
        <div>
            <script id="container" name="content" type="text/plain">
                    这里写你的初始化内容
            </script>
        </div>
    </div>
</template>


<script type="text/javascript">
    import HeaderTop from '../components/header.vue'
    import '../assets/js/ueditor.config.js'
    import '../assets/js/ueditor.all.js'
    export default{
        components:{HeaderTop}
    }
</script>
<script type="text/javascript">
    var ue = UE.getEditor('container');
</script>