<template>
    <div>
        <header-design ref="Header"></header-design>
        <flowMain />
    </div>
</template>
<script>
import flowMain from "@/components/designFlow/flowMain";
import HeaderDesign from "@/components/Header/HeaderDesign";
export default {
    name: "",
    data() {
        return {};
    },
    mounted() {},

    method: {},
    components: {
        flowMain,
        HeaderDesign,
    },
};
</script>
