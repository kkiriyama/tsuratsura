<template>
    <svg xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 20 20"
        aria-labelledby="too_bad"
        role="presentation">

    <title>too_bad</title>
    <g :fill="iconColor">
        <g id="layer_2" data-name="layer 2">
            <g id="layer_1-2" data-name="layer 1">
                <path class="cls-1" d="M10,0A10,10,0,1,0,20,10,10,10,0,0,0,10,0ZM6.25,5.736a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,6.25,5.736ZM5.125,13a1.463,1.463,0,1,1-2.713-1.095,4.459,4.459,0,0,1,1.109-1.347A12.722,12.722,0,0,1,4.962,9.5a14.124,14.124,0,0,1,.314,1.788A3.992,3.992,0,0,1,5.125,13Zm9.217,3.014a.66.66,0,0,1-.176.023A.523.523,0,0,1,13.7,15.8c-.256-.5-1.131-1.647-3.7-1.647S6.558,15.309,6.3,15.8a.568.568,0,0,1-.644.211c-.257-.07-.389-.278-.292-.465.687-1.325,2.42-2.116,4.635-2.116s3.948.791,4.634,2.116C14.732,15.737,14.6,15.945,14.342,16.015ZM13.75,8.736a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,13.75,8.736Z"/>
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
