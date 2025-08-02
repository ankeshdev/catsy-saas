import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clock, FileText } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Your Account is Under Review</h1>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 leading-relaxed">
            Thank you for signing up. An account manager will approve your request within 24 hours.
            {"We'll"} notify you by email once {"it's"} ready.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
