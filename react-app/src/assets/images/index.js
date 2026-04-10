// Image exports for the Home/hero and other sections.
// These point to the canonical remote URLs you provided.
// If you prefer to host them locally, run the curl commands below and
// update the paths to the local filenames (e.g. './street_view_2_3D_rendering-1831x1030.jpg').

export const STREET_VIEW_2 =
  "https://3das.com/wp-content/uploads/2024/04/street_view_2_3D_rendering-1831x1030.jpg";

export const AERIAL_VIEW_3D =
  "https://3das.com/wp-content/uploads/2021/08/aerial_view_3D_rendering-1831x1030.jpg";

export const DH_STREET_VIEW =
  "https://3das.com/wp-content/uploads/2025/11/DH_street_view_3D_rendering.jpg";

export default [STREET_VIEW_2, AERIAL_VIEW_3D, DH_STREET_VIEW];

/*
Optional: download images locally into this folder (run from repo root):

cd react-app
# macOS / Linux (zsh)
curl -L -o src/assets/images/street_view_2_3D_rendering-1831x1030.jpg "https://3das.com/wp-content/uploads/2024/04/street_view_2_3D_rendering-1831x1030.jpg"
curl -L -o src/assets/images/aerial_view_3D_rendering-1831x1030.jpg "https://3das.com/wp-content/uploads/2021/08/aerial_view_3D_rendering-1831x1030.jpg"
curl -L -o src/assets/images/DH_street_view_3D_rendering.jpg "https://3das.com/wp-content/uploads/2025/11/DH_street_view_3D_rendering.jpg"

After downloading, import like:
import hero from "../assets/images/street_view_2_3D_rendering-1831x1030.jpg";
or
import { STREET_VIEW_2 } from "../assets/images";
 and change the constant values to the local relative paths if you prefer.
*/
