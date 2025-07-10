import { SingleOpType } from "@/api/apiMongo";

type ReviewProps = {
    operator: SingleOpType;
};

const Review = ({ operator }: ReviewProps) => {
    return (
        <div>
            <p>In Construction👷‍♂️</p>
        </div>
    );
};

export default Review;
