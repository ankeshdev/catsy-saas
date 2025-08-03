import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AlertCircle, FileText } from "lucide-react"

export default function AccountInactivePage() {
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Account Inactive</h1>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 leading-relaxed">
            Your account is currently inactive. Please contact support for assistance.
          </p>
          <div className="mt-6">
            <p className="text-sm text-slate-500">
              Support: <a href="mailto:support@catsy.com" className="text-indigo-600 hover:text-indigo-700">support@catsy.com</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}