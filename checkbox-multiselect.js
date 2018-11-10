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
            selectedItemsVirtual: [],
            selectAll: false
        }
    },
    template: `
        <div :style="rootStyle">
            <div v-if="items.length > 0"><label :style="labelStyle"><input type="checkbox" value="true" v-model="selectAll" @change="selectAllChanged"> Select All</label></div>
            <div v-for="item in items">
                <label :style="labelStyle"><input type="checkbox" :value="item[value]" @change="handleChange($event)" v-model="selectedItemsVirtual"> {{ item[text] }}</label>
            </div>
        </div>
    `,
    methods: {
        handleChange(e) {
            this.handleSelectAllCheckbox()
            this.$emit('update:selectedItems', this.selectedItemsVirtual)
            this.$emit('change')
        },
        selectAllChanged() {
            if(this.selectAll) {
                this.selectedItemsVirtual = this.items.map(item => item.key)
            } else {
                this.selectedItemsVirtual = []
            }
            this.handleChange()
        },
        handleSelectAllCheckbox() {
            if(this.selectedItemsVirtual.length < this.items.length) {
                this.selectAll = false
            }
            if(this.selectedItemsVirtual.length > 0 && this.selectedItemsVirtual.length === this.items.length) {
                this.selectAll = true
            }
        }
    },
    watch: {
        selectedItems() {
            this.selectedItemsVirtual = this.selectedItems
            this.handleSelectAllCheckbox()
        },
        items() {
            this.selectedItemsVirtual = []
            this.handleChange()
        }
    }
})
