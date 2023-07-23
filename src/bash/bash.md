<div>
  <button @click="runScript">Run Bash Script</button>
  <pre>{{ output }}</pre>
</div>

<script>
import { exec } from 'child_process';

export default {
  data() {
    return {
      output: '',
    };
  },
  methods: {
    runScript() {
      exec('./get_token.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing the bash script: ${error.message}`);
          return;
        }

        this.output = stdout;
      });
    },
  },
};
</script>
