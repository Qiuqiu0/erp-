export const selectedRow={
  methods: {
    selectedRow(e) {
      this.index = this.tableData.indexOf(e);
      this.$refs.multipleTable.toggleRowSelection(e, true);
    }
  }
}