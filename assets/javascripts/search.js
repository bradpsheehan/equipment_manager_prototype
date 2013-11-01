$.fn.jobSearcher = function(options) {

    var defaults = {
        path: "data/jobs.json",
        outputId: "#output"
    };

    var options = $.extend(defaults, options);

    return this.each(function() {

        $(document).ready( function() {

            var jobBook = {

                search : function(event) {

                    $.getJSON(options.path, function(data){

                        var searchValue = $('#job-search').val(),
                            jobs = data.jobs,
                            jobs_count = jobs.length;

                        $(options.outputId).empty();

                        if(jobs_count > 0 && searchValue !== "") {

                            $.each(jobs, function(i, job) {

                                var findByTitle = job.title.indexOf(searchValue);

                                if( findByTitle !== -1) {

                                    $(options.outputId).append('<p>' + job.title + '<p>').hide().fadeIn();

                                } //end if

                            }); // end each

                        } // end if

                    }); // end ajax call
                },

                getAllJobs : function(event) {

                    event.preventDefault();

                    $.getJSON(options.path, function(data){

                        var jobs = data,
                            jobs_count = jobs.length;

                        $(options.outputId).empty();

                        if(jobs_count > 0) {

                            $.each(jobs, function(i, job) {

                                $(options.outputId).append('<p>' + job.title + '<p>').hide().fadeIn();

                            }); // end each

                        } // end if

                    }); // end ajax call
                }
            }; // end jobBook obj

            $("#job-search").keyup(jobBook.search).focus(function () {

                    $(this).parent().addClass("active");

                }).blur(function () {

                    $(this).parent().removeClass("active");

            });

            $("#search-form").hover(function () {
                $(this).addClass("hovering");

            }, function () {

                $(this).removeClass("hovering");

            }).submit(jobBook.search);

            $("#get-all").click(jobBook.getAllJobs);

        });

    }); // end loop

}; // end plugin
