const CONSULTATION_API =
    "https://script.google.com/macros/s/AKfycbxigEyl3ZW_MTnoIvLlRrmlNJetunsIrPktedxnHU3DeHVSWwy1kQqj9P0VsAh2lF_V/exec";


/* Khởi tạo trang giới thiệu */

console.log(
    "Trang giới thiệu đã tải"
);


        /* Popup Tư Vấn */

        const consultModal =
            document.getElementById(
                "consultModal"
            );

        const openConsultModal =
            document.getElementById(
                "openConsultModal"
            );

        console.log(
            "Button:",
            openConsultModal
        );

        console.log(
            "Modal:",
            consultModal
        );

        const closeConsultModal =
            document.getElementById(
                "closeConsultModal"
            );

        const consultForm =
            document.getElementById(
                "consultForm"
            );


        /* Mở Popup */

        if (openConsultModal) {

            openConsultModal.addEventListener(
                "click",
                () => {

                    console.log(
                        "Đã click"
                    );

                    consultModal.style.display =
                        "flex";

                }
            );
        }


        /* Đóng Popup */

        if (closeConsultModal) {

            closeConsultModal.addEventListener(
                "click",
                () => {

                    consultModal.style.display =
                        "none";

                }
            );
        }


        /* Click Ra Ngoài Để Đóng */

        window.addEventListener(
            "click",
            event => {

                if (
                    event.target === consultModal
                ) {

                    consultModal.style.display =
                        "none";

                }

            }
        );


        /* Load Danh Sách Sản Phẩm */

        function loadProducts() {

            /*
                TODO

                Đọc sản phẩm từ Google Sheet
                và render vào select#product
            */

        }

        loadProducts();


        /* Gửi Yêu Cầu Tư Vấn */

        if (consultForm) {

            consultForm.addEventListener(
                "submit",
                async event => {

                    event.preventDefault();

                    const requestData = {

                        fullName:
                            document
                                .getElementById(
                                    "fullName"
                                )
                                .value
                                .trim(),

                        email:
                            document
                                .getElementById(
                                    "email"
                                )
                                .value
                                .trim(),

                        phone:
                            document
                                .getElementById(
                                    "phone"
                                )
                                .value
                                .trim(),

                        product:
                            document
                                .getElementById(
                                    "product"
                                )
                                .value,

                        message:
                            document
                                .getElementById(
                                    "message"
                                )
                                .value
                                .trim()

                    };


                    /* Kiểm Tra Dữ Liệu */

                    if (
                        !requestData.fullName ||
                        !requestData.email ||
                        !requestData.phone
                    ) {

                        alert(
                            "Vui lòng nhập đầy đủ thông tin bắt buộc."
                        );

                        return;
                    }


                    try {

                        await fetch(
                            CONSULTATION_API,
                            {
                                method: "POST",

                                mode: "no-cors",

                                headers: {
                                    "Content-Type":
                                        "text/plain"
                                },

                                body:
                                    JSON.stringify(
                                        requestData
                                    )
                            }
                        );

                        alert(
                            "Yêu cầu tư vấn đã được gửi thành công."
                        );

                        consultForm.reset();

                        consultModal.style.display =
                            "none";

                    }
                    catch (error) {

                        console.error(
                            "Lỗi gửi yêu cầu:",
                            error
                        );

                        alert(
                            "Có lỗi xảy ra. Vui lòng thử lại."
                        );

                    }

                }
            );

        }

/* Counter Animation */

function startCounters() {

    const counters =
        document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            target / 100;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent =
                    Math.floor(current).toLocaleString("vi-VN");

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                if (target === 98) {

                    counter.textContent =
                        target + "%";

                } else {

                    counter.textContent =
                        target.toLocaleString("vi-VN") + "+";
                }
            }
        };

        updateCounter();
    });
}

/* Khởi tạo Counter */

const statsSection =
    document.querySelector(".stats");

if (statsSection) {

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        startCounters();

                        observer.disconnect();
                    }
                });

            },

            {
                threshold: 0.3
            }
        );

    observer.observe(statsSection);
}

if (
    window.location.hash ===
    "#/tu-van"
) {

    consultModal.style.display =
        "flex";

}