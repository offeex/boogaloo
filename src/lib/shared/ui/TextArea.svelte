<script lang="ts">
	export let id: string
	export let cols: number
	export let rows: number
</script>

<textarea name={id} {id} cols={cols} rows={rows} required>sssss</textarea>

<style lang='scss'>
  @use '@/ui/styles/colors';

  textarea {
    background-color: colors.$background;
    color: colors.$text;

    width: 100%;
    //height: 100%;
    padding: 8px 10px;
    box-sizing: border-box;
		resize: none;
    border: 1px solid colors.$primary;
    border-radius: 6px;

    transition: background-color 0.2s;

    &:focus {
      outline: none;
      background-color: colors.$secondary;
    }
  }
</style>