import React, { useEffect, useState } from 'react';

const MusicPlayer = ({ album, audio }) => {
  const [player, setPlayer] = useState(null);
  const [seekBar, setSeekBar] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState('0');
  const [currentTime, setCurrentTime] = useState('0');

  useEffect(() => {
    setPlayer(document.getElementById('album-player__music-player'));
  }, []);

  useEffect(() => {
    setSeekBar(document.getElementById('album-player__seek-bar'));
  }, []);

  useEffect(() => {
    if (player) {
      player.onloadedmetadata = () => {
        setDuration(player.duration);
        setCurrentTime(player.currentTime);
      };
    }
  }, [player]);

  useEffect(() => {
    if (player) {
      player.ontimeupdate = () => {
        setCurrentTime(player.currentTime);

        if (player.ended) {
          setPlaying(false);
          player.currentTime = 0;
        }
      };
    }
  }, [player]);

  function formatTime(totalSeconds) {
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(totalSeconds % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  const handlePlay = () => {
    if (playing) {
      player.pause();
      setPlaying(false);
    } else {
      player.play();
      setPlaying(true);
    }
  };

  const handleChange = () => {
    player.currentTime = seekBar.value;
  };

  return (
    <div className="album-player__audio-container">
      <audio
        id="album-player__music-player"
        className="album-player__music-player"
        preload="metadata"
      >
        <source src={audio} type="audio/mp3" />
        <p>
          Your browser does not support the <code>audio</code> element.
        </p>
      </audio>
      <div className="album-player__play-pause-container">
        <button
          type="button"
          className={
            playing
              ? 'fas fa-pause fa-2x album-player__play-button'
              : 'fas fa-play fa-2x album-player__play-button'
          }
          onClick={handlePlay}
        />
      </div>
      <div className="album-player__main-container">
        <div className="album-player__track-info-container">
          <span className="album-player__track-name">{album.name}</span>
          <span className="album-player__track-time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div className="album-player__seek-container">
          <input
            type="range"
            id="album-player__seek-bar"
            min="0"
            max={duration}
            // step={1 / duration}
            value={currentTime}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
