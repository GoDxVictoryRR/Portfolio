import sys
try:
    from moviepy import VideoFileClip
except ImportError:
    from moviepy.editor import VideoFileClip

def compress():
    print("Loading video...")
    clip = VideoFileClip("public/background.mp4")
    print(f"Original size: {clip.w}x{clip.h}, duration: {clip.duration}s")
    
    # Resize to 720p to save massive amounts of data
    if clip.h > 720:
        print("Resizing to 720p...")
        clip = clip.resized(height=720)
        
    print("Writing optimized video...")
    clip.write_videofile("public/background_optimized.mp4", codec="libx264", audio=False, bitrate="1500k", preset="veryfast")
    print("Done!")

if __name__ == "__main__":
    compress()
