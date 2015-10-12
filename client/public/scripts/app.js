app = {

    //initializing the application and attach event listener to
    //input field, handle submission of urls and check status
    init: function() {
      $('#archive_url').on('submit', app.handleArchiveURLSubmit);
      $('#job_status').on('submit', app.handleJobStatusSubmit);
      app.$url = $('#url');
      app.$jobid = $('#jobstatus')
    },

    //function handler for URL submission
    handleArchiveURLSubmit: function(e){
      e.preventDefault();
      var url = {
        url: app.$url.val()
      };
      app.$url.val('');
      app.submitUrl(url);
    },

    //ajax request that allow user to queue up a job
    //input: an object consisting of a URL
    //output: alert user of their job ID and if job is already completed, redirect them to the archived site assets
    submitUrl: function(job){
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/job/addjob',
        data: JSON.stringify(job),
        contentType: 'application/json',
        success: function(data){
          var location = data.location
          var jobID = data.jobID;
          if(jobID){
            console.log(jobID)
            alert('Your jobID is '+jobID)
          }
          window.location="http://localhost:8080" + location;
        }
      });
    },

    //function handler for job status submission
    handleJobStatusSubmit: function(e){
      e.preventDefault();
      var jobid = {
        id: app.$jobid.val()
      };
      app.$jobid.val('');
      app.checkJobStatus(jobid);
    },

    //ajax request that allow user to check for a job status
    //input: a job ID that the user type in
    //output: alert user of of the job status. If the job is completed, redirect them to the archived site assets
    checkJobStatus: function(jobid){
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/job/status',
        data: JSON.stringify(jobid),
        contentType: 'application/json',
        success: function(obj){
          var status = obj.status;
          var url = obj.url;
          if(status === 'incomplete'){
            alert('Robot is still archiving the site. Check back later!')
          }else if(status === 'completed'){
            window.location="http://localhost:8080/" + obj.url;
          }
        }
      });
    }
};
