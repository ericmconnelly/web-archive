app = {

    init: function() {
      $('#archive_url').on('submit', app.handleArchiveURLSubmit);
      $('#job_status').on('submit', app.handleJobStatusSubmit);
      app.$url = $('#url');
      app.$jobid = $('#jobstatus')
    },

    handleArchiveURLSubmit: function(e){
      e.preventDefault();
      var url = {
        url: app.$url.val()
      };
      app.$url.val('');

      console.log('>>>',url)
      app.submitUrl(url);
    },

    submitUrl: function(message){
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/api/job/addjob',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function(data){
          var location = data.location
          var jobID = data.jobID;
          console.log(data);
          if(jobID){
            console.log(jobID)
            alert('Your jobID is '+jobID)
          }
          window.location="http://localhost:8080" + location;
        }
      });
    },
    handleJobStatusSubmit: function(e){
      e.preventDefault();

      var jobid = {
        id: app.$jobid.val()
      };

      app.$jobid.val('');
      app.checkJobStatus(jobid);
    },

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
