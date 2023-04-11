<template>
  <el-card>
    <el-row>
      <el-col :span="4">
        <p>mark</p>
      </el-col>
      <el-col :span="7">
        <p>Place an order</p>
      </el-col>
      <el-col :span="13">
        <el-steps :active="steps" finish-status="success" align-center>
          <el-step title="step 1" description="Confirm cart"></el-step>
          <el-step title="step 2" description="Payment detail"></el-step>
          <el-step title="step 3" description="Submit"></el-step>
        </el-steps>
      </el-col>
    </el-row>

    <div>
      <div v-if="steps === 0">
        <el-card>
          <p>Step1</p>
        </el-card>
      </div>
      <div v-if="steps === 1">
        <el-card>
          <p>Step2</p>
        </el-card>
      </div>
      <div v-if="steps === 2">
        <el-card>
          <p>Step3</p>
        </el-card>
      </div>


    </div>



  </el-card>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      steps: 0,
    };
  },
}
</script>

<style scoped>

</style>
