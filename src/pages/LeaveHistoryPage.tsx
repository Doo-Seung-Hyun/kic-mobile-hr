import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import Chip from "../components/ui/Chip.tsx";

const LeaveHistoryPage = () => {
    return (<div>
        <div>
            <button>진행중</button>
            <button>완료</button>
            <button>반려</button>
        </div>
        <div className={"flex flex-col gap-3"}>
            <Card>
                <Card.Content className="font-normal">
                    <div className={"flex justify-between"}>
                        <span className={"font-semibold"}>연차휴가</span>
                        <span>2일</span>
                    </div>
                    <div className={"text-sm py-1"}>8.18(월) - 8.19(화)</div>
                    <div className={"mt-2"}>
                        <button>
                            <Chip outline classNames={"p-1 w-20"}>휴가변경</Chip>
                        </button>
                    </div>
                </Card.Content>
            </Card>
            <Card>
                <Card.Content className="font-normal">
                    <div className={"flex justify-between"}>
                        <span className={"font-semibold"}>연차휴가</span>
                        <span>2일</span>
                    </div>
                    <div className={"text-sm py-1"}>8.18(월) - 8.19(화)</div>
                    <div className={"mt-2 flex gap-2"}>
                        <button>
                            <Chip outline classNames={"p-1 w-20"}>휴가변경</Chip>
                        </button>
                        <button>
                            <Chip outline classNames={"p-1 w-20 border-red-400 text-red-600"}>휴가취소</Chip>
                        </button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    </div>)
}

export default LeaveHistoryPage;