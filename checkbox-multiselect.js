Vue.component('multiselect', {
    props: [
        'items', 'text', 'value', 'selectedItems'
    ],
    watch: {
        selectedItems() {
            this.selectedItemsVirtual = this.selectedItems
        }
    },
    data: function () {
        return {
            rootStyle: {
                display: 'inline-block',
                padding: '.429rem .929rem',
                border: '1px solid #e0e0e0',
                'border-radius': '.215rem',
                height: '10em',
                'min-width': '10em',
                color: '#757575',
                'overflow-y': 'auto',
                'font-family': 'sans-serif'
            },
            labelStyle: {
                display: 'block'
            },
            selectedItemsVirtual: []
        }
    },
    template: `
        <div :style="rootStyle">
            <div v-for="item in items">
                <label :style="labelStyle"><input type="checkbox" :value="item[value]" @change="handleChange($event)" v-model="selectedItemsVirtual"> {{ item[text] }}</label>
            </div>
        </div>
    `,
    methods: {
        handleChange(e) {
            // console.log(this.selectedItemsVirtual)
            this.$emit('update:selectedItems', this.selectedItemsVirtual)
            this.$emit('change')
        }
    },
    created() {
        this.selectedItemsVirtual = this.selectedItems
    }
})
