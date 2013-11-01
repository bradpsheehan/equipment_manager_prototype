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

                                    $(options.outputId).append('<p class="job-title" id="' + job.title + '">' + job.title + '<p>').hide().fadeIn();

                                } //end if

                            }); // end each

                        } // end if

                    }); // end ajax call
                },

                getAllJobs : function(event) {

                    event.preventDefault();

                    $.getJSON(options.path, function(data){

                        var jobs = data.jobs,
                            jobs_count = jobs.length;

                        $(options.outputId).empty();

                        if(jobs_count > 0) {

                            $.each(jobs, function(i, job) {

                                $(options.outputId).append('<p class="job-title" id="' + job.title + '">' + job.title + '<p>').hide().fadeIn();

                            }); // end each

                        } // end if

                    }); // end ajax call
                }
            }; // end jobBook obj

            var changeEquipment = function(milling) {

                $.getJSON(options.path, function(data){

                    var millingJob = data.jobs[0];

                    console.log(millingJob);

                    // set ppe attributes on page

                    //head
                    $('#hat').attr('src', './assets/images/' + millingJob.head.hat.image).hide().fadeIn();;
                    $('#eyes').attr('src', './assets/images/' + millingJob.head.eyes.image).hide().fadeIn();;

                    //chest
                    $('#chest-img-thumb').attr('src', './assets/images/' + millingJob.chest.image.thumb).hide().fadeIn();;
                    $('#chest-img-lrg').attr('src', './assets/images/' + millingJob.chest.image.lrg);
                    $('#chest-equipment-name').text( millingJob.chest.name ).hide().fadeIn();

                    //hands
                    $('#hands-img-thumb').attr('src', './assets/images/' + millingJob.hands.image.thumb).hide().fadeIn();;
                    $('#hands-img-lrg').attr('src', './assets/images/' + millingJob.hands.image.lrg);
                    $('#hands-equipment-name').text( millingJob.hands.name ).hide().fadeIn();;

                    //feet
                    $('#feet-img-thumb').attr('src', './assets/images/' + millingJob.feet.image.thumb).hide().fadeIn();;
                    $('#feet-img-lrg').attr('src', './assets/images/' + millingJob.feet.image.lrg);
                    $('#feet-equipment-name').text( millingJob.feet.name ).hide().fadeIn();;

                });
            }

            $("body").on("click", '#milling', function(event){
                
                event.preventDefault();

                var milling = $('#milling').text();

                // console.log(milling);

                changeEquipment(milling);
            });

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
