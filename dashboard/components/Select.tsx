import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectDemo({onChange}: {onChange: (value: string) => void}) {
    return (
        <Select onValueChange={(value)=> onChange(value)} defaultValue="age">
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="age">Age Distribution</SelectItem>
                    <SelectItem value="subCity">Address</SelectItem>
                    <SelectItem value="education">Education Level</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
