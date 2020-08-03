
<template>
    <div class="circle">
        <div class="out_circle">
            <div class="side_circle">
                <span>
                    {{warn.handle}}{{warn.total}}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "handleWarn",
    props: {
        warn: Object
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>
.circle{
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.out_circle{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    background: #2DB7F5;
}
.side_circle{
    width: 85px;
    height: 85px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    font-size: 14px;
    color: #657180;
}
</style>


