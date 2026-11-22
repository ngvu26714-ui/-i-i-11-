
"use strict";

// ============================================
// BBB11 - THƯ VIỆN ẢNH
// Kết nối Supabase: window.supabaseClient
// Bảng: bbb11_gallery
// Storage bucket: bbb11-gallery
// ============================================

(function () {
    const TABLE = "bbb11_gallery";
    const BUCKET = "bbb11-gallery";

    function client() {
        if (!window.supabaseClient) {
            throw new Error(
                "Chưa kết nối Supabase. Kiểm tra supabase.js."
            );
        }
        return window.supabaseClient;
    }

    function esc(value) {
        return String(value ?? "").replace(/[&<>"']/g, function (c) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[c];
        });
    }

    function notify(message) {
        window.alert(message);
    }

    // Trang thư viện ảnh
    window.galleryPage = function () {
        return `
        <style>
          .bbb-gallery { padding: 18px; color: var(--text-color, inherit); }
          .bbb-gallery h2 { margin: 0 0 8px; }
          .bbb-gallery .gallery-tools {
            display:flex; flex-wrap:wrap; gap:10px; margin:16px 0;
          }
          .bbb-gallery input, .bbb-gallery select,
          .bbb-gallery textarea {
            box-sizing:border-box; max-width:100%; padding:10px;
            border:1px solid #ccc; border-radius:8px; font:inherit;
          }
          .bbb-gallery .gallery-tools input { flex:1; min-width:180px; }
          .bbb-gallery button {
            border:0; border-radius:8px; padding:10px 14px;
            cursor:pointer; font:inherit;
          }
          .bbb-gallery .gallery-primary {
            background:#b91c1c; color:white; font-weight:600;
          }
          .bbb-gallery .gallery-form {
            display:grid; grid-template-columns:repeat(2,minmax(0,1fr));
            gap:12px; padding:16px; margin:12px 0;
            border:1px solid #ddd; border-radius:12px;
          }
          .bbb-gallery .gallery-form input,
          .bbb-gallery .gallery-form textarea { width:100%; }
          .bbb-gallery .gallery-wide { grid-column:1/-1; }
          .bbb-gallery .gallery-grid {
            display:grid;
            grid-template-columns:repeat(auto-fill,minmax(190px,1fr));
            gap:14px; margin-top:16px;
          }
          .bbb-gallery .gallery-card {
            overflow:hidden; border:1px solid #ddd; border-radius:12px;
            background:var(--card-bg, #fff); color:var(--text-color, #222);
          }
          .bbb-gallery .gallery-photo {
            display:block; width:100%; height:180px; object-fit:cover;
            cursor:pointer; background:#eee;
          }
          .bbb-gallery .gallery-info { padding:10px; }
          .bbb-gallery .gallery-info h4 {
            margin:0 0 6px; overflow-wrap:anywhere;
          }
          .bbb-gallery .gallery-desc {
            font-size:13px; opacity:.8; overflow-wrap:anywhere;
          }
          .bbb-gallery .gallery-actions {
            display:flex; flex-wrap:wrap; gap:6px; margin-top:10px;
          }
          .bbb-gallery .gallery-actions button {
            background:#eee; color:#222; padding:7px 9px; font-size:13px;
          }
          .bbb-gallery .gallery-status { padding:12px 0; }
          .bbb-gallery .gallery-lightbox {
            position:fixed; inset:0; z-index:99999; background:#000e;
            display:flex; align-items:center; justify-content:center;
            padding:20px;
          }
          .bbb-gallery .gallery-lightbox img {
            max-width:95vw; max-height:85vh; object-fit:contain;
          }
          .bbb-gallery .gallery-lightbox button {
            position:absolute; top:15px; right:20px;
            background:#fff; color:#111; font-size:18px;
          }
          @media(max-width:600px) {
            .bbb-gallery { padding:10px; }
            .bbb-gallery .gallery-form { grid-template-columns:1fr; }
            .bbb-gallery .gallery-wide { grid-column:auto; }
          }
        </style>

        <section class="bbb-gallery">
          <h2>🖼️ THƯ VIỆN ẢNH BBB11</h2>
          <p>Kho ảnh hoạt động, huấn luyện và sinh hoạt Đại đội 11.</p>

          <div class="gallery-tools">
            <button class="gallery-primary"
              onclick="bbb11ToggleGalleryForm()">＋ Thêm ảnh</button>
            <input id="bbbGallerySearch" type="search"
              placeholder="Tìm tên ảnh, mô tả hoặc album..."
              oninput="loadGallery()">
            <select id="bbbGalleryAlbum" onchange="loadGallery()">
              <option value="">Tất cả album</option>
            </select>
          </div>

          <form id="bbbGalleryForm" class="gallery-form"
            style="display:none"
            onsubmit="bbb11SaveGalleryImage(event)">
            <input id="bbbGalleryTitle" maxlength="150"
              placeholder="Tên ảnh" required>
            <input id="bbbGalleryAlbumInput" maxlength="100"
              placeholder="Tên album (ví dụ: Huấn luyện)">
            <input id="bbbGalleryUrl" class="gallery-wide" type="url"
              placeholder="Đường dẫn ảnh (nếu dùng URL)">
            <label class="gallery-wide">
              Hoặc chọn ảnh từ máy tính
              <input id="bbbGalleryFile" type="file"
                accept="image/*">
            </label>
            <textarea id="bbbGalleryDescription" class="gallery-wide"
              rows="3" maxlength="1000"
              placeholder="Mô tả ảnh (không bắt buộc)"></textarea>
            <div class="gallery-wide">
              <button class="gallery-primary" type="submit">
                Lưu ảnh
              </button>
              <button type="button" onclick="bbb11ToggleGalleryForm(false)">
                Hủy
              </button>
            </div>
            <p class="gallery-wide" style="margin:0;font-size:13px">
              Chọn ảnh từ máy tính hoặc nhập URL. Ảnh tải lên sẽ được
              lưu trong kho Supabase của BBB11.
            </p>
          </form>

          <div id="bbbGalleryStatus" class="gallery-status">
            Đang tải thư viện ảnh...
          </div>
          <div id="bbbGalleryGrid" class="gallery-grid"></div>
        </section>`;
    };

    window.bbb11ToggleGalleryForm = function (show) {
        const form = document.getElementById("bbbGalleryForm");
        if (!form) return;
        form.style.display =
            show === undefined
                ? (form.style.display === "none" ? "grid" : "none")
                : (show ? "grid" : "none");
    };

    // Đọc dữ liệu từ Supabase
    window.loadGallery = async function () {
        const grid = document.getElementById("bbbGalleryGrid");
        const status = document.getElementById("bbbGalleryStatus");
        if (!grid || !status) return;

        status.textContent = "Đang tải ảnh...";
        grid.innerHTML = "";

        try {
            const { data, error } = await client()
                .from(TABLE)
                .select("id,title,album,description,image_url,storage_path,created_at")
                .order("created_at", { ascending: false });

            if (error) throw error;

            const images = data || [];
            const search = (
                document.getElementById("bbbGallerySearch")?.value || ""
            ).trim().toLowerCase();
            const albumSelect = document.getElementById("bbbGalleryAlbum");
            const selectedAlbum = albumSelect?.value || "";

            // Cập nhật danh sách album, giữ nguyên lựa chọn hiện tại
            if (albumSelect) {
                const albums = [...new Set(
                    images.map(x => x.album).filter(Boolean)
                )].sort((a, b) => a.localeCompare(b, "vi"));

                albumSelect.innerHTML =
                    '<option value="">Tất cả album</option>' +
                    albums.map(a =>
                        `<option value="${esc(a)}">${esc(a)}</option>`
                    ).join("");

                if (albums.includes(selectedAlbum)) {
                    albumSelect.value = selectedAlbum;
                }
            }

            const filtered = images.filter(item => {
                const text = [
                    item.title, item.album, item.description
                ].join(" ").toLowerCase();

                return text.includes(search) &&
                    (!selectedAlbum || item.album === selectedAlbum);
            });

            status.textContent = filtered.length
                ? `Có ${filtered.length} ảnh`
                : (images.length
                    ? "Không tìm thấy ảnh phù hợp."
                    : "Chưa có ảnh. Hãy nhấn “Thêm ảnh” để bắt đầu.");

            grid.innerHTML = filtered.map(item => `
              <article class="gallery-card">
                <img class="gallery-photo"
                  src="${esc(item.image_url)}"
                  alt="${esc(item.title)}"
                  loading="lazy"
                  onclick="bbb11OpenGalleryImage('${item.id}')"
                  onerror="this.style.opacity='.3';this.alt='Không tải được ảnh';">
                <div class="gallery-info">
                  <h4>${esc(item.title || "Ảnh không có tên")}</h4>
                  ${item.album
                    ? `<div class="gallery-desc">Album: ${esc(item.album)}</div>`
                    : ""}
                  ${item.description
                    ? `<p class="gallery-desc">${esc(item.description)}</p>`
                    : ""}
                  <div class="gallery-actions">
                    <button onclick="bbb11EditGalleryImage('${item.id}')">
                      Sửa thông tin
                    </button>
                    <button onclick="bbb11DeleteGalleryImage('${item.id}')">
                      Xóa ảnh
                    </button>
                  </div>
                </div>
              </article>
            `).join("");

            // Lưu dữ liệu vừa tải để xem ảnh và thao tác
            window.bbb11GalleryItems = images;
        } catch (error) {
            console.error("BBB11 gallery:", error);
            status.textContent =
                "Không tải được thư viện ảnh. Hãy kiểm tra kết nối Supabase và quyền truy cập.";
        }
    };

    // Thêm ảnh bằng URL hoặc tải ảnh từ máy tính
    window.bbb11SaveGalleryImage = async function (event) {
        if (event) event.preventDefault();

        const title = document.getElementById("bbbGalleryTitle")?.value.trim();
        const album = document.getElementById("bbbGalleryAlbumInput")?.value.trim() || "";
        const description =
            document.getElementById("bbbGalleryDescription")?.value.trim() || "";
        const urlInput = document.getElementById("bbbGalleryUrl")?.value.trim() || "";
        const file = document.getElementById("bbbGalleryFile")?.files?.[0];
        const submit = document.querySelector(
            "#bbbGalleryForm button[type='submit']"
        );

        if (!title) {
            notify("Vui lòng nhập tên ảnh.");
            return;
        }

        if (!file && !urlInput) {
            notify("Hãy chọn ảnh từ máy tính hoặc nhập URL ảnh.");
            return;
        }

        if (file && !file.type.startsWith("image/")) {
            notify("Tệp được chọn không phải là ảnh.");
            return;
        }

        if (file && file.size > 10 * 1024 * 1024) {
            notify("Ảnh vượt quá 10 MB. Hãy chọn ảnh nhỏ hơn.");
            return;
        }

        if (file && urlInput) {
            notify("Hãy chọn tải ảnh lên hoặc dùng URL, không chọn cả hai.");
            return;
        }

        if (submit) {
            submit.disabled = true;
            submit.textContent = "Đang lưu...";
        }

        let storagePath = null;

        try {
            let imageUrl = urlInput;

            if (file) {
                const safeName = file.name
                    .normalize("NFKD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-zA-Z0-9._-]/g, "_");

                storagePath =
                    `${Date.now()}_${Math.random().toString(36).slice(2, 9)}_${safeName}`;

                const { error: uploadError } = await client()
                    .storage.from(BUCKET)
                    .upload(storagePath, file, {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: file.type
                    });

                if (uploadError) throw uploadError;

                const { data: publicData } = client()
                    .storage.from(BUCKET)
                    .getPublicUrl(storagePath);

                imageUrl = publicData.publicUrl;
            }

            const { error } = await client()
                .from(TABLE)
                .insert([{
                    title,
                    album,
                    description,
                    image_url: imageUrl,
                    storage_path: storagePath
                }]);

            if (error) {
                // Dọn ảnh vừa tải lên nếu không lưu được bản ghi
                if (storagePath) {
                    await client().storage.from(BUCKET).remove([storagePath]);
                }
                throw error;
            }

            document.getElementById("bbbGalleryForm")?.reset();
            window.bbb11ToggleGalleryForm(false);
            notify("Đã lưu ảnh vào thư viện BBB11!");
            await window.loadGallery();
        } catch (error) {
            console.error("BBB11 save gallery image:", error);
            notify("Không lưu được ảnh: " + (error.message || "Lỗi Supabase"));
        } finally {
            if (submit) {
                submit.disabled = false;
                submit.textContent = "Lưu ảnh";
            }
        }
    };

    window.bbb11OpenGalleryImage = function (id) {
        const item = (window.bbb11GalleryItems || []).find(x => x.id === id);
        if (!item) return;

        document.getElementById("bbbGalleryLightbox")?.remove();

        const overlay = document.createElement("div");
        overlay.id = "bbbGalleryLightbox";
        overlay.className = "gallery-lightbox";
        overlay.innerHTML = `
          <button type="button" aria-label="Đóng"
            onclick="document.getElementById('bbbGalleryLightbox')?.remove()">
            ✕ Đóng
          </button>
          <img src="${esc(item.image_url)}" alt="${esc(item.title)}">
        `;
        overlay.addEventListener("click", event => {
            if (event.target === overlay) overlay.remove();
        });
        document.body.appendChild(overlay);
    };

    window.bbb11EditGalleryImage = async function (id) {
        const item = (window.bbb11GalleryItems || []).find(x => x.id === id);
        if (!item) return;

        const title = window.prompt("Tên ảnh:", item.title || "");
        if (title === null) return;

        const album = window.prompt("Tên album:", item.album || "");
        if (album === null) return;

        const description = window.prompt("Mô tả ảnh:", item.description || "");
        if (description === null) return;

        try {
            const { error } = await client()
                .from(TABLE)
                .update({
                    title: title.trim(),
                    album: album.trim(),
                    description: description.trim()
                })
                .eq("id", id);

            if (error) throw error;

            notify("Đã cập nhật thông tin ảnh.");
            await window.loadGallery();
        } catch (error) {
            console.error("BBB11 edit gallery image:", error);
            notify("Không sửa được ảnh: " + (error.message || "Lỗi Supabase"));
        }
    };

    window.bbb11DeleteGalleryImage = async function (id) {
        const item = (window.bbb11GalleryItems || []).find(x => x.id === id);
        if (!item) return;

        if (!window.confirm(
            `Bạn có chắc muốn xóa ảnh "${item.title}" không?`
        )) return;

        try {
            const { error } = await client()
                .from(TABLE)
                .delete()
                .eq("id", id);

            if (error) throw error;

            // Chỉ xóa file trong Storage nếu ảnh do hệ thống tải lên
            if (item.storage_path) {
                const { error: storageError } = await client()
                    .storage.from(BUCKET)
                    .remove([item.storage_path]);

                if (storageError) {
                    console.warn("Không xóa được file Storage:", storageError);
                }
            }

            notify("Đã xóa ảnh khỏi thư viện.");
            await window.loadGallery();
        } catch (error) {
            console.error("BBB11 delete gallery image:", error);
            notify("Không xóa được ảnh: " + (error.message || "Lỗi Supabase"));
        }
    };

    console.log("BBB11: Đã nạp module thư viện ảnh.");
})();
