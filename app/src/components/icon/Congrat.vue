<template>
    <svg xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 19.86 20.067"
        aria-labelledby="congrat"
        role="presentation">

    <title>congrat</title>
    <g :fill="iconColor">
        <g id="layer_2" data-name="layer 2">
            <g id="layer_1-2" data-name="layer 1">
                <path class="cls-1" d="M13.36,7.875l.707.707a3.6,3.6,0,0,1,5.086,0l.707-.707A4.6,4.6,0,0,0,13.36,7.875Z"/>
                <path class="cls-1" d="M12.344,5.453a3.859,3.859,0,0,0,0-5.453l-.707.707a2.86,2.86,0,0,1,0,4.039Z"/><rect class="cls-1" x="8.828" y="0.964" width="1" height="1.587" transform="translate(-0.16 2.039) rotate(-12.368)"/><rect class="cls-1" x="15.886" y="4.01" width="3.047" height="1" transform="translate(-0.504 2.918) rotate(-9.444)"/><rect class="cls-1" x="16.659" y="10.982" width="0.999" height="0.826" transform="translate(1.91 25.242) rotate(-75.832)"/>
                <path class="cls-1" d="M.112,17.274A.9.9,0,0,0,.23,18.31l1.3,1.458A.9.9,0,0,0,2.55,20l4.918-2.042L1.313,15.1Z"/><polygon class="cls-1" points="1.797 14.221 8.721 17.437 14.002 15.244 3.837 10.524 1.797 14.221"/>
                <path class="cls-1" d="M8.52,4.517a.887.887,0,0,0-.773-.295.9.9,0,0,0-.686.46L4.321,9.646l10.934,5.078.579-.241a.9.9,0,0,0,.325-1.43Z"/>
            </g>
        </g>
    </g>
    </svg>
</template>

<script>

export default {
  props: {
    width: {
      type: Number,
      default: 18
    },
    height: {
      type: Number,
      default: 18
    },
    iconColor: {
      type: String,
      default: 'gray'
    }
  }
}
</script>
