/*
  RESTAURANT CONFIGURATION
  ------------------------
  Change these values for each restaurant.
*/
const RESTAURANT = {
  name: "RASAM ",
  logo: "🍽️",

  // Replace this with the restaurant's Google Maps review URL.
  googleReviewUrl: "https://g.page/r/Cdv2K6lPHPnuEBM/review",

  reviews: {
    okay: {
      1: [
        "The experience was okay overall. There are a few areas that could be improved.",
        "We had an alright experience. The visit was decent, with some room for improvement.",
        "The overall experience was okay. We hope to see some improvements on our next visit."
      ],
      2: [
        "The experience was okay overall. The food and service were decent, although there is some room for improvement.",
        "We had a fairly okay visit. Some things were good, while other areas could be improved.",
        "Overall, it was an okay experience. We appreciate the effort and hope to have an even better visit next time."
      ],
      3: [
        "We had a decent experience overall. The food and service were good, with a few areas that could be improved.",
        "A pleasant enough visit overall. There were some good aspects, although there is room to make the experience even better.",
        "We enjoyed parts of our visit and had a decent overall experience. Looking forward to seeing some improvements."
      ],
      4: [
        "We had a good experience overall. The food was enjoyable and the service was pleasant. A few small things could be improved.",
        "A good visit overall. We enjoyed the food and appreciated the service. There is still a little room for improvement.",
        "Overall, a good experience. The food and atmosphere were enjoyable and the staff were pleasant."
      ],
      5: [
        "We had a very good experience. The food was enjoyable, the service was pleasant, and we had a nice time overall.",
        "Really enjoyed our visit. The food was good and the service was friendly. We had a pleasant experience overall.",
        "A very good experience overall. We enjoyed the food and the atmosphere and would be happy to visit again."
      ]
    },

    good: {
      1: [
        "The experience was okay overall. There are a few things that could be improved.",
        "We had a decent visit, although some aspects could have been better.",
        "Overall, it was an okay experience with some room for improvement."
      ],
      2: [
        "We had a decent experience overall. The food was enjoyable, although some things could be improved.",
        "A fairly good visit overall, with a few areas that could be better.",
        "We enjoyed some parts of the experience and hope to see a few improvements next time."
      ],
      3: [
        "We had a good experience overall. The food was enjoyable and the service was pleasant.",
        "A good visit overall. We enjoyed the food and had a pleasant time.",
        "Overall, a nice experience. The food and service were good and we enjoyed our visit."
      ],
      4: [
        "Had a really good experience. The food was tasty, the service was friendly, and we enjoyed the atmosphere.",
        "Really enjoyed our visit. Good food, friendly service, and a pleasant atmosphere. Would visit again.",
        "A great overall experience. The food was good and the staff were welcoming and attentive."
      ],
      5: [
        "Had a wonderful experience! The food was delicious, the service was friendly, and the atmosphere was great.",
        "Really enjoyed our visit. Great food, welcoming staff, and a lovely atmosphere. Would definitely come back.",
        "Fantastic experience overall. The food was excellent and the service was warm and attentive. Highly recommended."
      ]
    },

    amazing: {
      1: [
        "We had an okay experience overall. There are some areas that could be improved.",
        "The visit was decent, although not everything worked perfectly for us.",
        "Overall, it was an okay experience with room for improvement."
      ],
      2: [
        "We had a good experience overall, although a few things could be improved.",
        "A pleasant visit overall. Some aspects were good and there is still room for improvement.",
        "We enjoyed the visit overall and hope to see a few small improvements in the future."
      ],
      3: [
        "We had a very good experience overall. The food was enjoyable and the service was pleasant.",
        "A really enjoyable visit. Good food, friendly service, and a nice atmosphere.",
        "Overall, a very good experience. We enjoyed the food and had a great time."
      ],
      4: [
        "Had a fantastic experience! The food was delicious, the staff were friendly, and the atmosphere was wonderful.",
        "Really enjoyed our visit. Excellent food, welcoming service, and a great atmosphere. We would happily return.",
        "A fantastic overall experience. The food was delicious and the team made us feel very welcome."
      ],
      5: [
        "Absolutely loved our experience! The food was fantastic, the service was warm and attentive, and the atmosphere was wonderful.",
        "Amazing experience from start to finish. Delicious food, excellent service, and a beautiful atmosphere. We will definitely be back.",
        "Fantastic experience! Everything came together perfectly — great food, wonderful service, and a lovely atmosphere. Highly recommended."
      ]
    }
  }
};

const experienceStep = document.getElementById("stepExperience");
const ratingStep = document.getElementById("stepRating");
const reviewsStep = document.getElementById("stepReviews");

const restaurantName = document.getElementById("restaurantName");
const restaurantLogo = document.getElementById("restaurantLogo");
const ratingText = document.getElementById("ratingText");
const continueRating = document.getElementById("continueRating");
const reviewOptions = document.getElementById("reviewOptions");
const copyReview = document.getElementById("copyReview");
const googleReview = document.getElementById("googleReview");
const startOver = document.getElementById("startOver");
const status = document.getElementById("status");

let selectedExperience = null;
let selectedRating = null;
let selectedReview = null;

restaurantName.textContent = RESTAURANT.name;
restaurantLogo.textContent = RESTAURANT.logo;
document.title = `${RESTAURANT.name} - Leave a Review`;

const ratingLabels = {
  1: "1 Star",
  2: "2 Stars",
  3: "3 Stars",
  4: "4 Stars",
  5: "5 Stars"
};

document.querySelectorAll(".experience").forEach(button => {
  button.addEventListener("click", () => {
    selectedExperience = button.dataset.level;
    experienceStep.classList.remove("active");
    ratingStep.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.querySelectorAll("#stars button").forEach(button => {
  button.addEventListener("click", () => {
    selectedRating = Number(button.dataset.rating);

    document.querySelectorAll("#stars button").forEach(star => {
      star.classList.toggle("selected", Number(star.dataset.rating) <= selectedRating);
    });

    ratingText.textContent = ratingLabels[selectedRating];
    continueRating.disabled = false;
  });
});

continueRating.addEventListener("click", () => {
  generateReviews();
  ratingStep.classList.remove("active");
  reviewsStep.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function generateReviews() {
  const list = RESTAURANT.reviews[selectedExperience][selectedRating] || [];
  selectedReview = null;
  copyReview.disabled = true;
  googleReview.disabled = true;
  status.textContent = "";

  reviewOptions.innerHTML = list.map((review, index) => `
    <label class="review-option">
      <input type="radio" name="review" value="${index}">
      <strong>Option ${index + 1}</strong>
      <p class="review-text">${escapeHtml(review)}</p>
    </label>
  `).join("");

  document.querySelectorAll('input[name="review"]').forEach(input => {
    input.addEventListener("change", () => {
      selectedReview = list[Number(input.value)];

      document.querySelectorAll(".review-option").forEach(option => {
        option.classList.remove("selected");
      });
      input.closest(".review-option").classList.add("selected");

      copyReview.disabled = false;
      googleReview.disabled = false;
    });
  });
}

copyReview.addEventListener("click", async () => {
  if (!selectedReview) return;

  try {
    await navigator.clipboard.writeText(selectedReview);
    status.textContent = "Review copied. You can now paste it into Google.";
  } catch {
    status.textContent = "Please copy the review manually.";
  }
});

googleReview.addEventListener("click", () => {
  if (!selectedReview) return;
  window.open(RESTAURANT.googleReviewUrl, "_blank", "noopener,noreferrer");
});

startOver.addEventListener("click", () => {
  selectedExperience = null;
  selectedRating = null;
  selectedReview = null;

  document.querySelectorAll("#stars button").forEach(star => {
    star.classList.remove("selected");
  });

  ratingText.textContent = "Select a rating";
  continueRating.disabled = true;
  reviewOptions.innerHTML = "";
  status.textContent = "";

  reviewsStep.classList.remove("active");
  ratingStep.classList.remove("active");
  experienceStep.classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
});

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}
