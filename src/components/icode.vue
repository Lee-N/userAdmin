<template>
        <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode" :contentWidth="100" :content-height="40"></s-identify>
        </div>
</template>
    <script>
        import identify from './identify'
        export default {
            name: "codetest",
            data() {
                return {
                    identifyCodes: "1234567890",
                    identifyCode: ""
                };
            },
            mounted() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            methods: {
                randomNum(min, max) {
                    return Math.floor(Math.random() * (max - min) + min);
                },
                refreshCode() {
                    this.identifyCode = "";
                    this.makeCode(this.identifyCodes, 4);
                },
                makeCode(o, l) {
                    for (let i = 0; i < l; i++) {
                        this.identifyCode += this.identifyCodes[
                            this.randomNum(0, this.identifyCodes.length)
                            ];
                    }
                    console.log(this.identifyCode);
                }
            },
            components:{
                's-identify':identify
            }
        };
    </script>

    <style>
        .code {
               width: 100px;
            display: inline-block;
        }
    </style>
