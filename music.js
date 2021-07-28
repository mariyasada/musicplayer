
       
        const music = document.querySelector("audio");
        const play = document.getElementById("play");
        const img = document.querySelector("img");
        const artist = document.getElementById("artist");
        const title = document.getElementById("title");
        const prev = document.getElementById("prev");
        const next = document.getElementById("next");
        const von  = document.getElementById("von");

        let progress_time = document.getElementById("progress");
        let current_time = document.getElementById("current_time");
        let total_duration = document.getElementById("duration");
        progress_div = document.getElementById("progress_div");

        const songs = [
            { 
                name: "mariya_1",
                title: "Taal se Taal",
                artist: "Alka yagnik, udit narayan",
            },
            {
                name: "mariya_2",
                title: "Tu mujhe jaan",
                artist: "Bappi lehri",
            },
            {
                name: "mariya_3",
                title: "Tumne kisi se",
                artist: "mukesh",
            },
        
            {
                name: "mariya_4",
                title: "Tere sang yaara",
                artist: "atif aslam",
            },
        {
                name: "mariya_5",
                title: "sayad meri shadi",
                artist: "Lata mangeshkar",
        },];
        
        let isPlaying = false;
        // for play button code
        const playMusic = () => {
            isPlaying = true;
            music.play();
            play.classList.replace("fa-play","fa-pause");
            img.classList.add("anime");            
        };
         // for pause button code
        const pauseMusic = () => {
            isPlaying = false;
            music.pause();
            play.classList.replace("fa-pause","fa-play");
            img.classList.remove("anime");            
        };
        play.addEventListener("click",() => {
              /*if (isPlaying)
              { pauseMusic();}
              else
              { playMusic();}*/
              isPlaying ? pauseMusic() :playMusic();
        });

        // Changing the music data
         const loadSong = (songs) => {
            title.textContent = songs.title;
            artist.textContent = songs.artist;
            music.src = "music/" + songs.name + ".mp3";
            img.src = "image/" + songs.name + ".jpg";
         };
          
         songIndex = 0;
         //loadSong(songs[2]);
         const nextSong = () =>{
             songIndex = (songIndex + 1) % songs.length;
            loadSong(songs[songIndex]);
             playMusic();
         };

         const prevSong = () =>{
             songIndex = (songIndex - 1 + songs.length) % songs.length;
             loadSong(songs[songIndex]);
             playMusic();
         };
         
         //for soundon and off
        const volumeon = () => {
            if(music.muted)
            {
             music.muted = false;
             von.classList.replace("fa-volume-mute","fa-volume-up");
            }
            else
            {
                music.muted =true;
                von.classList.replace("fa-volume-up","fa-volume-mute");
            }
        };

        /////////////////////// progress  Js Works
        music.addEventListener("timeupdate",(event) => {
            //console.log(event);
            const { currentTime , duration } = event.srcElement;
            let progress_time = (currentTime / duration) * 100 ;
            progress.style.width = `${progress_time}%`;

            // music timing update
            let min_duration = Math.floor(duration / 60);
            let sec_duration = Math.floor(duration % 60);
           // console.log(min_duration);
            //console.log(sec_duration);
            let tot_duration = `${min_duration}:${sec_duration}`;
            if(duration){
            total_duration.textContent = `${tot_duration}`;
            } 
            // current duration update
           let min_currentTime = Math.floor(currentTime / 60);
           let sec_currentTime  = Math.floor(currentTime % 60);
           if(sec_currentTime < 10)
           {sec_currentTime = `0${sec_currentTime}`}; 
           let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
            current_time.textContent = `${tot_currentTime}`;
              
        });
        // progress onclick functionality
        progress_div.addEventListener("click",(event) => {
            console.log(event);
            const {duration} = music;
            let move_progress =(event.offsetX / event.srcElement.clientWidth) * duration;
            //console.log(duration);
            //console.log(move_progress);
            music.currentTime = move_progress;
        });

 ///      if msong ended then play next song
        music.addEventListener("ended" ,nextSong);
         von.addEventListener("click",volumeon);
         next.addEventListener("click",nextSong);
         prev.addEventListener("click",prevSong);