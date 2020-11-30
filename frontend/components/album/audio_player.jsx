import React, { useEffect, useRef, useState } from 'react';
import AlbumShowTracks from './album_show_tracks';

const AudioPlayer = ({ album, tracks }) => {
  const { trackIds } = album;

  const player = useRef();
  const seekBar = useRef();

  const [currentTrack, setCurrentTrack] = useState(tracks[trackIds[0]]);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('0');

  useEffect(() => {
    setCurrentTrack(tracks[trackIds[0]]);
    player.current.pause();
    player.current.load();
  }, [tracks, trackIds]);

  useEffect(() => {
    if (player.current) {
      player.current.onloadedmetadata = () => {
        setCurrentTime(player.current.currentTime);
      };
    }
  }, [player]);

  useEffect(() => {
    if (player.current) {
      player.current.ontimeupdate = () => {
        setCurrentTime(player.current.currentTime);

        if (player.current.ended) {
          if (currentTrack.ord === trackIds[trackIds.length - 1]) {
            setPlaying(false);
            setCurrentTrack(tracks[trackIds[0]]);
            player.current.pause();
            player.current.load();
          } else {
            const nextTrack = tracks[currentTrack.ord + 1];
            setCurrentTrack(nextTrack);
            player.current.pause();
            player.current.load();
            player.current.play();
          }
        }
      };
    }
  }, [player, tracks, trackIds, currentTrack.ord]);

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
      player.current.pause();
      setPlaying(false);
    } else {
      player.current.play();
      setPlaying(true);
    }
  };

  const handlePrev = () => {
    const prevTrack = tracks[currentTrack.ord - 1];
    setCurrentTrack(prevTrack);
    player.current.pause();
    player.current.load();
    player.current.play();
  };

  const handleNext = () => {
    const nextTrack = tracks[currentTrack.ord + 1];
    setCurrentTrack(nextTrack);
    player.current.pause();
    player.current.load();
    player.current.play();
  };

  const handleChange = () => {
    player.current.currentTime = seekBar.current.value;
  };

  return (
    <>
      <div className="album-player__audio-container">
        <audio
          className="album-player__music-player"
          preload="metadata"
          ref={player}
        >
          <source src={currentTrack.audioUrl} type="audio/mp3" />
          <p>
            Your browser does not support the <code>audio</code> element.
          </p>
        </audio>
        <div className="album-player__play-pause-container">
          <button
            type="button"
            aria-label="play-audio"
            className={
              playing
                ? 'fas fa-pause album-player__play-button'
                : 'fas fa-play album-player__play-button'
            }
            onClick={handlePlay}
          />
        </div>
        <div className="album-player__main-container">
          <div className="album-player__track-info-container">
            <span className="album-player__track-name">
              {currentTrack.name}
            </span>
            <span className="album-player__track-time">
              {formatTime(currentTime)} / {formatTime(currentTrack.duration)}
            </span>
          </div>
          <div className="album-player__seek-container">
            <div className="album-player__seek-controls">
              <input
                type="range"
                className="album-player__seek-bar"
                min="0"
                max={currentTrack.duration}
                value={currentTime}
                onChange={handleChange}
                ref={seekBar}
              />
            </div>
            <div className="album-player__direction-controls">
              <button
                type="button"
                aria-label="prev-track"
                className="fas fa-fast-backward album-player__previous-button"
                onClick={handlePrev}
                disabled={currentTrack.ord === 1}
              />
              <button
                type="button"
                aria-label="next-track"
                className="fas fa-fast-forward album-player__next-button"
                onClick={handleNext}
                disabled={currentTrack.ord === trackIds[trackIds.length - 1]}
              />
            </div>
          </div>
        </div>
      </div>
      <AlbumShowTracks
        trackIds={trackIds}
        tracks={tracks}
        player={player}
        playing={playing}
        setPlaying={setPlaying}
        currentTrack={currentTrack}
        setCurrentTrack={setCurrentTrack}
        handlePlay={handlePlay}
        formatTime={formatTime}
      />
    </>
  );
};

export default AudioPlayer;
