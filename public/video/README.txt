Optional opening video
----------------------
The opening screen is an animated, illustrated recreation of Pinterest reference 1
(see REFERENCES.md). If you have a video you OWN or are LICENSED to use, made for
Sita & Ram (the Pinterest original shows another couple's names), put it here:

  public/video/opening.mp4          (H.264 MP4, ideally 1080x1920 or 1920x1080, < 8 MB)
  public/video/opening-poster.jpg   (first frame, for slow connections)

then in src/content/wedding.ts set:

  opening: { ..., video: "/video/opening.mp4", poster: "/video/opening-poster.jpg" }

It plays full-screen, muted and inline (so autoplay is allowed), with the names
layered over it and the "Open Our Wedding Invitation" button. If it fails to load,
the illustrated opening is used automatically.
